import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const BPMonitor = () => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Systolic:", systolic);
    console.log("Diastolic:", diastolic);
    navigate("/pulse-monitor");
  };

  return (
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
    </div>
  );
};

export default BPMonitor;
