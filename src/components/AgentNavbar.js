import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../cssfiles/AgentNavbar.css';

const AgentNavbar = () => {
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
        navigate("/agent-profile"); // Redirect to agent's profile page
    };

    return (
        <nav className="agent-navbar">
            <div className="agent-nav-left">
                <Link to="/agent-dashboard">Dashboard</Link>
                <Link to="/agent-properties">My Properties</Link>
                <Link to="/agent-inquiries">Manage Inquiries</Link>
                <Link to="/agent-reports">Reports</Link>
            </div>
            <div className="agent-profile-section">
                <div className="agent-profile-icon" onClick={() => document.getElementById('profile-dropdown').classList.toggle('show')}>
                    {userName ? userName.charAt(0).toUpperCase() : "U"} {/* First letter of the name */}
                </div>
                <div id="profile-dropdown" className="agent-dropdown-content">
                    <button onClick={handleLogout} className="agent-logout-button">Logout</button>
                    <button onClick={myProfile} className="agent-logout-button">My Profile</button>
                </div>
            </div>
            <ToastContainer /> {/* Toast container for displaying toasts */}
        </nav>
    );
};

export default AgentNavbar;
