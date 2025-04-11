import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const Checkup = () => {
  const navigate = useNavigate();

  return (
    <section className="checkup-section">
      <h1 style={{fontWeight:700}}>General and Symptom-Based Checkup</h1>
      <p>Select checkup mode:</p>
      <div className="checkup-buttons">
        <button className="general-btn" onClick={() => navigate("/general-checkup")}>
          General Checkup
        </button>
        <button className="symptom-btn" onClick={() => alert("Symptom-based checkup coming soon!")}>
          Symptom-Based Checkup
        </button>
      </div>
    </section>
  );
};

export default Checkup;
