import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const Cholesterol = () => {
  const [chol, setChol] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cholesterol:", chol);
    navigate("/thalach-key"); 
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Cholesterol Level</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="chol">Cholesterol (mg/dL):</label>
            <input
              type="number"
              id="chol"
              value={chol}
              onChange={(e) => setChol(e.target.value)}
              required
            />
          </div>
          <button type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default Cholesterol;
