import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import '../cssfiles/AdminNavbar.css'; // Updated CSS file for admin navbar

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout actions (e.g., clear session data, etc.)
        localStorage.clear(); // Clear session storage

        toast.success("Logged out successfully!"); // Show toast message

        // Delay navigation to allow toast to appear
        setTimeout(() => {
            navigate("/signin"); // Redirect to the login page
        }, 1000); // Delay by 1 second (1000 milliseconds)
    };

    return (
        <div className="admin-navbar">
            <div className="admin-nav-left">
                <Link to="/admin-dashboard">Dashboard</Link>
                <Link to="/admin-manage-users">Manage Users</Link>
                <Link to="/admin-manage-properties">Manage Properties</Link>
                
               
            </div>
            <div className="admin-profile">
                <button onClick={handleLogout}>Logout</button>
            </div>
            <ToastContainer /> {/* Toast container for displaying toasts */}
        </div>
    );
};

export default AdminNavbar;
