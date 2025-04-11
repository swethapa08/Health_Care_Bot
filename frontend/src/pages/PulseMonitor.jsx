import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const PulseMonitor = () => {
  const [spo2, setSpo2] = useState("");
  const [respiration, setRespiration] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pulse data:", { spo2, respiration });

    // Redirect to Blood Glucose page
    navigate("/blood-glucose");
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Pulse Monitor</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              SPO2:
              <input
                type="number"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Respiration:
              <input
                type="number"
                value={respiration}
                onChange={(e) => setRespiration(e.target.value)}
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

export default PulseMonitor;
