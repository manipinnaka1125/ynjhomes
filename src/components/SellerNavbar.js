import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../cssfiles/SellerNavbar.css';

const SellerNavbar = () => {
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
        navigate("/seller-profile"); // Redirect to seller's profile page
    };

    return (
        <nav className="seller-navbar">
            <div className="seller-nav-left">
                <Link to="/seller-dashboard">Dashboard</Link>
                <Link to="/seller-properties">My Properties</Link>
                <Link to="/seller-reports">Reports</Link>
            </div>
            <div className="seller-profile-section">
                <div className="seller-profile-icon" onClick={() => document.getElementById('seller-profile-dropdown').classList.toggle('show')}>
                    {userName ? userName.charAt(0).toUpperCase() : "U"} {/* First letter of the name */}
                </div>
                <div id="seller-profile-dropdown" className="seller-dropdown-content">
                    <button onClick={handleLogout} className="seller-logout-button">Logout</button>
                    <button onClick={myProfile} className="seller-logout-button">My Profile</button>
                </div>
            </div>
            <ToastContainer /> {/* Toast container for displaying toasts */}
        </nav>
    );
};

export default SellerNavbar;
