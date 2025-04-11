import React, { useState } from "react";
import "./Checkup.css";

const ExerciseBloodPressure = () => {
  const [exang, setExang] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exercise BP:", exang);
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Exercise-Induced Blood Pressure</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="exang">Exercise BP (mm Hg):</label>
            <input
              type="number"
              id="exang"
              value={exang}
              onChange={(e) => setExang(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseBloodPressure;
