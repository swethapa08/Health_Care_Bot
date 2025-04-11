import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import "./BPMonitor.css";
=======
import "./Checkup.css";
>>>>>>> Stashed changes
=======
import "./Checkup.css";
>>>>>>> Stashed changes

const BPMonitor = () => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< Updated upstream
<<<<<<< Updated upstream

    // You can send systolic/diastolic to backend here if needed
    console.log("Systolic:", systolic);
    console.log("Diastolic:", diastolic);

=======
    console.log("Systolic:", systolic);
    console.log("Diastolic:", diastolic);
>>>>>>> Stashed changes
=======
    console.log("Systolic:", systolic);
    console.log("Diastolic:", diastolic);
>>>>>>> Stashed changes
    navigate("/pulse-monitor");
  };

  return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Blood Pressure Monitor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="systolic" className="block text-sm font-medium text-gray-700 mb-1">
            Systolic Pressure (mmHg)
          </label>
          <input
            type="number"
            id="systolic"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="diastolic" className="block text-sm font-medium text-gray-700 mb-1">
            Diastolic Pressure (mmHg)
          </label>
          <input
            type="number"
            id="diastolic"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
=======
=======
>>>>>>> Stashed changes
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Blood Pressure Monitor</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Systolic Pressure (mmHg):
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Diastolic Pressure (mmHg):
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit">Proceed</button>
        </form>
      </div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
  );
};

export default BPMonitor;
