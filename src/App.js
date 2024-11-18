import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import HomePage from "./pages/HomePage";

const App = () => (
  <Router>




    <MainNavbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
    
    </Routes>
  </Router>

);

export default App;
