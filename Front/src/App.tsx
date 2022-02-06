import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SingupPage from "./components/sign-up/SignupPage";
import EditDetailsPage from "./components/edit-details/EditDetails";
import LandingPage from "./components/landing-page/LandingPage";
import { useAppSelector } from "./redux/store";

const App = () => {
  const email = useAppSelector((state) => state.userReducer.email);

  useEffect(
    () => () => {
      navigator.sendBeacon(
        `http://localhost:4000/users/connected/${email}`,
        JSON.stringify({ connected: false })
      );
    },
    []
  );

  return (
    <div className="App">
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="signup" element={<SingupPage />} />
        <Route path="editDetails" element={<EditDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
