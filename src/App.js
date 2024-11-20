import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import HomePage from "./pages/HomePage";
import Services from "./pages/servicesss";
import Footer from "./pages/Footer"; // Import the Footer component

const App = () => (
  <Router>
    <MainNavbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<Services />} />
    </Routes>

    {/* Add Footer component at the bottom of the page */}
    <Footer />
  </Router>
);

export default App;
