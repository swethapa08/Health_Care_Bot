import React, { useState } from "react";
import "./Checkup.css";

const Checkup = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="checkup-section">
      <h2>General and Symptom-Based Checkup</h2>
      <p>Select checkup mode:</p>
      <div className="checkup-buttons">
        <button className="general-btn" onClick={() => setSelected("general")}>
          General Checkup
        </button>
        <button className="symptom-btn" onClick={() => setSelected("symptom")}>
          Symptom-Based Checkup
        </button>
      </div>

      {selected === "general" && (
  <div className="general-grid">
    <div className="vital-card">
      <h4>Blood Pressure</h4>
      <p>120/80 mmHg</p>
    </div>
    <div className="vital-card">
      <h4>Temperature</h4>
      <p>98.6°F</p>
    </div>
    <div className="vital-card">
      <h4>Heart Rate</h4>
      <p>72 bpm</p>
    </div>
    <div className="vital-card">
      <h4>Oxygen Level</h4>
      <p>98%</p>
    </div>
    <div className="vital-card">
      <h4>Weight</h4>
      <p>68 kg</p>
    </div>
    <div className="vital-card">
      <h4>Height</h4>
      <p>170 cm</p>
    </div>
    <div className="vital-card">
      <h4>Blood Sugar</h4>
      <p>90 mg/dL</p>
    </div>
    <div className="vital-card">
      <h4>Respiratory Rate</h4>
      <p>16 breaths/min</p>
    </div>
  </div>
)}



      {selected === "symptom" && (
        <div className="symptom-list">
         {[
              "Fever", "Cough", "Headache", "Fatigue", 
              "Sore Throat", "Shortness of Breath", 
              "Nausea", "Dizziness", "Chest Pain", "Rash"
          ].map(symptom => (

            <div className="symptom-card" key={symptom}>
              <h4>{symptom}</h4>
              <p>Click here to get related info & actions.</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Checkup;
