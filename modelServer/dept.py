import pennylane as qml
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.model_selection import train_test_split
import seaborn as sns
import os
import pickle
import time

# Import the dataset generator
#from medical_dataset_generator import generate_realistic_medical_dataset, prepare_dataset

# Define quantum device
n_qubits = 6  # Increased number of qubits for better representation
dev = qml.device("default.qubit", wires=n_qubits)

# Quantum Convolutional Layer
@qml.qnode(dev)
def quantum_conv_circuit(inputs, weights):
    # Scale inputs to be between -π and π for better quantum encoding
    scaled_inputs = np.clip(inputs, -1, 1) * np.pi

    # Encode selected inputs into quantum states
    for i in range(n_qubits):
        qml.RY(scaled_inputs[i], wires=i)

    # First convolutional-like structure with parameterized rotation gates
    for i in range(n_qubits):
        qml.RX(weights[0, i], wires=i)
        qml.RZ(weights[1, i], wires=i)

    # Entanglement layer (creating quantum "feature maps")
    for i in range(n_qubits - 1):
        qml.CNOT(wires=[i, i + 1])
    qml.CNOT(wires=[n_qubits - 1, 0])  # Circular boundary condition

    # Second rotation layer
    for i in range(n_qubits):
        qml.RY(weights[2, i], wires=i)
        qml.RZ(weights[3, i], wires=i)

    # Additional entanglement for deep feature extraction
    for i in range(0, n_qubits, 2):
        qml.CNOT(wires=[i, (i + 1) % n_qubits])

    # Final rotation layer
    for i in range(n_qubits):
        qml.RX(weights[4, i], wires=i)

    # Measurement: return expectation values for each wire
    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]

# Define the hybrid classical-quantum model
class QuantumCNN(nn.Module):
    def __init__(self, n_qubits, n_symptoms, n_departments):
        super(QuantumCNN, self).__init__()

        self.n_qubits = n_qubits

        # Classical pre-processing layers
        self.pre_process = nn.Sequential(
            nn.Linear(n_symptoms, 32),
            nn.ReLU(),
            nn.Dropout(0.2),  # Prevent overfitting
            nn.Linear(32, 16),
            nn.ReLU(),
            nn.Linear(16, n_qubits),
            nn.Tanh()  # Bound to [-1, 1] for quantum input
        )

        # Quantum layer weights (5 layers of rotation gates)
        self.q_weights = nn.Parameter(torch.randn(5, n_qubits))

        # Classical post-processing layers
        self.post_process = nn.Sequential(
            nn.Linear(n_qubits, 16),
            nn.ReLU(),
            nn.Linear(16, n_departments)
        )

    def forward(self, x):
        batch_size = x.shape[0]

        # Classical pre-processing
        pre_processed = self.pre_process(x)

        # Process each sample in the batch through the quantum circuit
        q_out = torch.zeros(batch_size, self.n_qubits)

        for i in range(batch_size):
            # Convert inputs to numpy for PennyLane circuit
            q_out[i] = torch.tensor(
                quantum_conv_circuit(
                    pre_processed[i].detach().numpy(),
                    self.q_weights.detach().numpy()
                )
            )

        # Classical post-processing
        return self.post_process(q_out)

# Training function
def train_quantum_cnn(model, X_train, y_train, X_val=None, y_val=None, epochs=50, batch_size=16):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    X_train_tensor = torch.tensor(X_train, dtype=torch.float32)
    y_train_tensor = torch.tensor(y_train, dtype=torch.long)

    # Validation data
    if X_val is not None:
        X_val_tensor = torch.tensor(X_val, dtype=torch.float32)
        y_val_tensor = torch.tensor(y_val, dtype=torch.long)
        val_available = True
    else:
        val_available = False

    losses = []
    val_losses = []
    val_accuracies = []

    # Create mini-batches
    n_batches = len(X_train) // batch_size + (1 if len(X_train) % batch_size != 0 else 0)

    for epoch in range(epochs+1):
        model.train()
        epoch_loss = 0

        # Shuffle training data
        perm = torch.randperm(len(X_train_tensor))
        X_train_tensor = X_train_tensor[perm]
        y_train_tensor = y_train_tensor[perm]

        start_time = time.time()

        for i in range(n_batches):
            # Get mini-batch
            start_idx = i * batch_size
            end_idx = min((i + 1) * batch_size, len(X_train_tensor))

            X_batch = X_train_tensor[start_idx:end_idx]
            y_batch = y_train_tensor[start_idx:end_idx]

            # Forward pass
            optimizer.zero_grad()
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)

            # Backward pass and optimize
            loss.backward()
            optimizer.step()

            epoch_loss += loss.item()

        avg_epoch_loss = epoch_loss / n_batches
        losses.append(avg_epoch_loss)

        # Validation
        if val_available:
            model.eval()
            with torch.no_grad():
                val_outputs = model(X_val_tensor)
                val_loss = criterion(val_outputs, y_val_tensor)
                val_losses.append(val_loss.item())

                _, predicted = torch.max(val_outputs, 1)
                correct = (predicted == y_val_tensor).sum().item()
                accuracy = correct / len(y_val_tensor)
                val_accuracies.append(accuracy)

        epoch_time = time.time() - start_time

        if epoch % 5 == 0:
            print(f"Epoch {epoch}: Train Loss = {avg_epoch_loss:.4f}, Time = {epoch_time:.2f}s", end="")
            if val_available:
                print(f", Val Loss = {val_losses[-1]:.4f}, Val Accuracy = {val_accuracies[-1]:.4f}")
            else:
                print("")

    return {
        "train_losses": losses,
        "val_losses": val_losses if val_available else None,
        "val_accuracies": val_accuracies if val_available else None
    }

def evaluate_model(model, X_test, y_test, department_names):
    """Evaluate the model and print metrics"""
    model.eval()

    X_test_tensor = torch.tensor(X_test, dtype=torch.float32)
    y_test_tensor = torch.tensor(y_test, dtype=torch.long)

    with torch.no_grad():
        outputs = model(X_test_tensor)
        _, predicted = torch.max(outputs, 1)

        correct = (predicted == y_test_tensor).sum().item()
        accuracy = correct / len(y_test_tensor)

        print(f"Test Accuracy: {accuracy:.4f}")

        # Calculate confusion matrix
        cm = confusion_matrix(y_test_tensor.numpy(), predicted.numpy())

        # Print classification report
        report = classification_report(
            y_test_tensor.numpy(),
            predicted.numpy(),
            target_names=department_names
        )
        print("\nClassification Report:")
        print(report)

        # Plot confusion matrix
        plt.figure(figsize=(12, 10))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                   xticklabels=department_names,
                   yticklabels=department_names)
        plt.xlabel('Predicted')
        plt.ylabel('Actual')
        plt.title('Confusion Matrix')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        plt.savefig('confusion_matrix.png')
        plt.close()

        return accuracy, cm, report

def predict_department(model, symptoms, scaler, symptom_names, department_names):
    """Predict department based on symptoms"""
    # If input is a dictionary, convert to array based on symptom names
    if isinstance(symptoms, dict):
        symptom_array = np.zeros(len(symptom_names))
        for symptom, value in symptoms.items():
            if symptom in symptom_names:
                idx = symptom_names.index(symptom)
                symptom_array[idx] = value
        symptoms = symptom_array

    # Scale the input
    symptoms_scaled = scaler.transform([symptoms])

    # Convert to tensor
    symptoms_tensor = torch.tensor(symptoms_scaled, dtype=torch.float32)

    # Predict
    model.eval()
    with torch.no_grad():
        output = model(symptoms_tensor)
        probabilities = torch.softmax(output, dim=1)
        values, indices = torch.topk(probabilities, 3)

        # Get top 3 predictions with probabilities
        predictions = []
        for i in range(3):
            dept_idx = indices[0][i].item()
            prob = values[0][i].item() * 100
            predictions.append((department_names[dept_idx], prob))

    return predictions

def main():
    # Setup directories
    data_dir = "medical_dataset"
    model_dir = "model"
    os.makedirs(model_dir, exist_ok=True)

    # Check if dataset exists, if not, generate it
    if not os.path.exists(data_dir) or not all(os.path.exists(f"{data_dir}/{file}")
            for file in ["X_train.npy", "y_train.npy", "metadata.pkl"]):
        print("Generating new medical dataset...")
        dataset = prepare_dataset(data_dir)
    else:
        # Load existing dataset
        print("Loading existing medical dataset...")
        dataset = {
            "X_train": np.load(f"{data_dir}/X_train.npy"),
            "X_test": np.load(f"{data_dir}/X_test.npy"),
            "y_train": np.load(f"{data_dir}/y_train.npy"),
            "y_test": np.load(f"{data_dir}/y_test.npy")
        }

        # Load metadata
        with open(f"{data_dir}/metadata.pkl", "rb") as f:
            metadata = pickle.load(f)

        dataset.update({
            "symptom_names": metadata["symptom_names"],
            "department_names": metadata["department_names"]
        })

        # Load scaler
        with open(f"{data_dir}/scaler.pkl", "rb") as f:
            scaler = pickle.load(f)
            dataset["scaler"] = scaler

    # Further split training data to create validation set
    X_train, X_val, y_train, y_val = train_test_split(
        dataset["X_train"], dataset["y_train"],
        test_size=0.2, random_state=42
    )

    # Initialize model
    n_symptoms = X_train.shape[1]
    n_departments = len(dataset["department_names"])
    model = QuantumCNN(n_qubits=n_qubits, n_symptoms=n_symptoms, n_departments=n_departments)

    # Train model
    print(f"\nTraining Quantum CNN for symptom-to-department prediction...")
    print(f"Model architecture: {n_symptoms} symptoms -> {n_qubits} qubits -> {n_departments} departments")
    print(f"Departments: {dataset['department_names']}")

    training_results = train_quantum_cnn(
        model, X_train, y_train, X_val, y_val,
        epochs=75, batch_size=16
    )

    # Plot training curves
    plt.figure(figsize=(10, 6))
    plt.plot(training_results["train_losses"], label="Training Loss")
    plt.plot(training_results["val_losses"], label="Validation Loss")
    plt.xlabel("Epoch")
    plt.ylabel("Loss")
    plt.title("Training and Validation Loss")
    plt.legend()
    plt.savefig(f"{model_dir}/training_curve.png")
    plt.close()

    # Evaluate model
    print("\nEvaluating model on test data...")
    accuracy, cm, report = evaluate_model(
        model, dataset["X_test"], dataset["y_test"],
        dataset["department_names"]
    )

    # Save model
    torch.save({
        "model_state_dict": model.state_dict(),
        "accuracy": accuracy,
        "n_qubits": n_qubits,
        "n_symptoms": n_symptoms,
        "n_departments": n_departments
    }, f"{model_dir}/quantum_cnn_model.pth")

    # Example prediction
    print("\nExample symptom prediction:")
    # Generate a sample patient with some symptoms
    sample_symptoms = np.zeros(len(dataset["symptom_names"]))
    # Set some cardiology-related symptoms
    sample_symptoms[dataset["symptom_names"].index("Chest Pain")] = 8
    sample_symptoms[dataset["symptom_names"].index("Shortness of Breath")] = 7
    sample_symptoms[dataset["symptom_names"].index("Fatigue")] = 6

    predictions = predict_department(
        model, sample_symptoms, dataset["scaler"],
        dataset["symptom_names"], dataset["department_names"]
    )

    print(f"Patient symptoms: Chest Pain (8/10), Shortness of Breath (7/10), Fatigue (6/10)")
    print("Top department predictions:")
    for dept, prob in predictions:
        print(f"  - {dept}: {prob:.2f}%")

    return model, dataset

if __name__ == "__main__":
    model, dataset = main()
