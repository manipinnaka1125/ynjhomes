import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../cssfiles/MainNavbar.css";
import image from "../images/image.png";

const MainNavbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo with image */}
        <Link to="/" className="navbar-logo">
          <img src={image} alt="YNJ Homes Logo" className="navbar-logo-img" />
        </Link>

        <ul
          className={isMobile ? "nav-links-mobile active" : "nav-links"}
          onClick={() => setIsMobile(false)}
        >
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li>
            <Link to="/projects" className="nav-link">
              Projects
            </Link>
          </li>
         
          <li>
            <Link to="/contact-us" className="nav-link">
              Contact
            </Link>
          </li>
         
        </ul>

        {/* Right-aligned number */}
       
        <div style={{ display: 'flex', alignItems: 'center' }}>
  {/* Register Link with regular styling */}
  <Link 
    style={{ marginRight: "20px" }} 
    to="/register" 
    className="nav-link"
  >
    Register?
  </Link>

  {/* Sign In Link with custom styles */}
  <Link 
    to="/signin" 
    className="nav-link navbar-signin"
    
  >
    Sign In
  </Link>
</div>
<div className="navbar-number">
        +1 770 298 1014
        </div>


        <button
          className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <>&#10005;</> : <>&#9776;</>}
        </button>
      </div>
    </nav>
  );
};

export default MainNavbar;
