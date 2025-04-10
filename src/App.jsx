import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkup from "./pages/Checkup";
import Records from "./pages/Records";
import Consultation from "./pages/Consultation";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkup" element={<Checkup />} />
          <Route path="/records" element={<Records />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;