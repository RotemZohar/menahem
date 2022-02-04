import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SingupPage from "./components/sing-up/SingupPage";
import LandingPage from "./components/landing-page/LandingPage"

const App = () => (
  <div className="App">
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="signup" element={<SingupPage />} />
    </Routes>
  </div>
);

export default App;
