import React from "react";
import "./Checkup.css";

const Checkup = () => (
  <section className="checkup-section">
    <h2>General and Symptom-Based Checkup</h2>
    <p>Select checkup mode:</p>
    <div className="checkup-buttons">
      <button className="general-btn">General Checkup</button>
      <button className="symptom-btn">Symptom-Based Checkup</button>
    </div>
  </section>
);

export default Checkup;
