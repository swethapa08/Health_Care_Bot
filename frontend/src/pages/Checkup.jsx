import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const Checkup = () => {
  const navigate = useNavigate();

  return (
    <section className="checkup-section">
      <br></br>
      <h1 style={{fontWeight:700}}>GENERAL AND SYMPTOM-BASED CHECKUP</h1><br></br>
      <h2>SELECT CHECKUP MODE</h2>
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
