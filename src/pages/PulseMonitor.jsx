import React, { useState } from "react";
import "./Checkup.css"; 
const PulseMonitor = () => {
  const [spo2, setSpo2] = useState("");
  const [respiration, setRespiration] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pulse data:", { spo2, respiration });
    setSubmitted(true);
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
          <br />
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
          <br />
          <button type="submit">Submit</button>
        </form>
        {submitted && <p className="success-message">Pulse data submitted successfully!</p>}
      </div>
    </div>
  );
};

export default PulseMonitor;
