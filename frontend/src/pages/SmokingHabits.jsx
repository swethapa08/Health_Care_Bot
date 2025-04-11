import React, { useState } from "react";
import "./Checkup.css";

const SmokingHabits = () => {
  const [smoking, setSmoking] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Smoking habit:", smoking);
    alert(`Smoking Habit Submitted: ${smoking}`);
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Smoking Habits</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Do you smoke?</label>
            <div><br></br>
              <label>
                <input
                  type="radio"
                  value="Yes"
                  checked={smoking === "Yes"}
                  onChange={(e) => setSmoking(e.target.value)}
                  required
                />{" "}
                Yes
              </label>
              <label style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  value="No"
                  checked={smoking === "No"}
                  onChange={(e) => setSmoking(e.target.value)}
                />{" "}
                No
              </label>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SmokingHabits;
