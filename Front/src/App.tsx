import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SingupPage from "./components/sing-up/SingupPage";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="signup" element={<SingupPage />} />
    </Routes>
  </div>
);

export default App;
