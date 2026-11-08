import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./features/navbar";
import Dashboard from "./pages/dashboard";
import Dreams from "./pages/dreams";
import Habits from "./pages/habits";
import Landing from "./pages/landing/LandingPage";
import RegisterPage from "./pages/registration/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";

export const App = () => {
  return (
    <BrowserRouter basename="/dot">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dreams" element={<Dreams />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;