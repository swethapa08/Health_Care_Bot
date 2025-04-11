import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BPMonitor.css";

const BPMonitor = () => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send systolic/diastolic to backend here if needed
    console.log("Systolic:", systolic);
    console.log("Diastolic:", diastolic);

    navigate("/pulse-monitor");
  };

  return (
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
    </div>
  );
};

export default BPMonitor;
