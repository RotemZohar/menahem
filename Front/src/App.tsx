import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SingupPage from "./components/sign-up/SignupPage";
import EditDetailsPage from "./components/edit-details/EditDetails";
import LandingPage from "./components/landing-page/LandingPage";
import { useAppSelector } from "./redux/store";

const App = () => {
  const email = useAppSelector((state) => state.userReducer.email);

  useEffect(() => {
    // No email = no need to disconnect
    if (!email) return () => {};

    // The function that disconnects
    const disconnect = () =>
      navigator.sendBeacon(
        `http://localhost:4000/users/connected/${email}?connected=false`
      );

    // When the window closes, disconnect
    window.addEventListener("unload", disconnect);

    // If the email changed before the window closed
    return () => {
      // Disconnect right now
      disconnect();
      // No need to disconnect when the window closesS
      window.removeEventListener("unload", disconnect);
    };
  }, [email]);

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
