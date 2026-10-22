import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./features/navbar";
import Landing from "./pages/landing/LandingPage";
import Dashboard from "./pages/dashboard";
import Dreams from "./pages/dreams";
import Habits from "./pages/habits";

export const App = () => {
  return (
    <BrowserRouter basename="/dot">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dreams" element={<Dreams />} />
        <Route path="/habits" element={<Habits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;