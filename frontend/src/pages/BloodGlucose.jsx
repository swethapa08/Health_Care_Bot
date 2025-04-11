import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const BloodGlucose = () => {
  const [fasting, setFasting] = useState("");
  const [random, setRandom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blood Glucose Data:", { fasting, random });
    // Redirect to Temperature page
    navigate("/temperature");
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Blood Glucose</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Fasting (mg/dL):
              <input
                type="number"
                value={fasting}
                onChange={(e) => setFasting(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Random (mg/dL):
              <input
                type="number"
                value={random}
                onChange={(e) => setRandom(e.target.value)}
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

export default BloodGlucose;
