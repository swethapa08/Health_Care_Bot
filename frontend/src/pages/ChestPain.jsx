import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const ChestPain = () => {
  const [cp, setCp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Chest Pain:", cp);
    navigate("/trestbps-key"); 
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Chest Pain Type</h3><br></br>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Select Chest Pain Type:</label>
            <select
              value={cp}
              onChange={(e) => setCp(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="0">No pain</option>
              <option value="1">Other than chest pain</option>
              <option value="2">Yes, chest pain</option>
            </select>
          </div><br></br>
          <button type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default ChestPain;
