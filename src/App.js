import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import HomePage from "./pages/HomePage";
import Services from "./pages/servicesss";
import Footer from "./pages/Footer"; // Import the Footer component
import Projects from "./pages/Projects";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";

const App = () => (
  <Router>
    <MainNavbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>


    {/* Add Footer component at the bottom of the page */}
    <Footer />
  </Router>
);

export default App;
