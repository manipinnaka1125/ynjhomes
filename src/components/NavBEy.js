import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../cssfiles/BuyerNavbar.css';

const  NavBEy = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName"); // Get the logged-in user's name

    const handleLogout = () => {
        localStorage.clear(); // Clear session data
        toast.success("Logged out successfully!"); // Show toast message
        
        // Delay navigation to allow toast to appear
        setTimeout(() => {
            navigate("/signin"); // Redirect to the login page
        }, 1000);
    };

    const myProfile = () => {
        navigate("/buyer-profile"); // Redirect to buyer's profile page
    };

    return (
        <nav className="buyer-navbar">
            <div className="buyer-nav-left">
                <Link to="/buyer-dashboard">Dashboard</Link>
                <Link to="/buyer-properties">Properties</Link>
                <Link to="/buyer-inquiries">My Inquiries</Link>
            </div>
            <div className="profile-section">
                <div className="profile-icon" onClick={() => document.getElementById('profile-dropdown').classList.toggle('show')}>
                    {userName ? userName.charAt(0).toUpperCase() : "U"} {/* First letter of the name */}
                </div>
                <div id="profile-dropdown" className="dropdown-content">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                    <button onClick={myProfile} className="profile-button">My Profile</button>
                </div>
            </div>
            <ToastContainer /> {/* Toast container for displaying toasts */}
        </nav>
    );
};

export default NavBEy;
