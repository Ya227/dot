import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./features/navbar";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter basename="/dot">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;