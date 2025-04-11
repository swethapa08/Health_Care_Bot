import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const HeartRate = () => {
  const [thalach, setThalach] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Heart Rate:", thalach);
    navigate("/exang-key"); 
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Heart Rate</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="thalach">Heart Rate (bpm):</label>
            <input
              type="number"
              id="thalach"
              value={thalach}
              onChange={(e) => setThalach(e.target.value)}
              required
            />
          </div>
          <button type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default HeartRate;
