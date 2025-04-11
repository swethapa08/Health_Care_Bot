import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const RestBloodPressure = () => {
  const [trestbps, setTrestbps] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resting Blood Pressure:", trestbps);
    navigate("/chol-key");
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Resting Blood Pressure</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="trestbps">Resting BP (mmHg):</label>
            <input
              type="number"
              id="trestbps"
              value={trestbps}
              onChange={(e) => setTrestbps(e.target.value)}
              required
            />
          </div>
          <button type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default RestBloodPressure;
