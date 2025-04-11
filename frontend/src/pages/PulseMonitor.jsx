import React, { useState } from "react";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import "./Checkup.css"; 
const PulseMonitor = () => {
  const [spo2, setSpo2] = useState("");
  const [respiration, setRespiration] = useState("");
  const [submitted, setSubmitted] = useState(false);
=======
=======
>>>>>>> Stashed changes
import { useNavigate } from "react-router-dom";
import "./Checkup.css";

const PulseMonitor = () => {
  const [spo2, setSpo2] = useState("");
  const [respiration, setRespiration] = useState("");
  const navigate = useNavigate();
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pulse data:", { spo2, respiration });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    setSubmitted(true);
=======

   
    navigate("/blood-glucose");
>>>>>>> Stashed changes
=======

   
    navigate("/blood-glucose");
>>>>>>> Stashed changes
  };

  return (
    <div className="bp-monitor-wrapper">
      <div className="checkup-form">
        <h3>Pulse Monitor</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              SPO2:
              <input
                type="number"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                required
              />
            </label>
          </div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          <br />
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          <div className="input-group">
            <label>
              Respiration:
              <input
                type="number"
                value={respiration}
                onChange={(e) => setRespiration(e.target.value)}
                required
              />
            </label>
          </div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          <br />
          <button type="submit">Submit</button>
        </form>
        {submitted && <p className="success-message">Pulse data submitted successfully!</p>}
=======
          <button type="submit">Proceed</button>
        </form>
>>>>>>> Stashed changes
=======
          <button type="submit">Proceed</button>
        </form>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default PulseMonitor;
