import React from "react";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Navbar from "./features/navbar";
import AboutDream from "./pages/aboutDream/aboutDream";
import Dashboard from "./pages/dashboard";
import FormDreams from "./pages/dreamform";
import Habits from "./pages/habits";
import Landing from "./pages/landing/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import RegisterPage from "./pages/registration/RegisterPage";

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const BlankLayout = () => (
  <>
    <Outlet />
  </>
);

export const App = () => {
  return (
    <BrowserRouter basename="/dot">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dreamform" element={<FormDreams />} />
          <Route path="/aboutDream/:id" element={<AboutDream />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
