import React from "react";
import { Link } from "react-router-dom";
import "../cssfiles/SellerDashboard.css"; // Import the CSS file

const SellerDashboard = () => {
    return (
        <div className="seller-dashboard-container">
            <div className="seller-dashboard-header">
                <h1>Welcome to Your Seller Dashboard</h1>
                <p>Manage your listings, track your sales, and more</p>
            </div>
            <div className="seller-dashboard-body">
                <div className="dashboard-card">
                    <Link to="/seller-properties" className="dashboard-link">
                        <div className="dashboard-item">
                            <h2>Properties</h2>
                            <p>Manage and update your listed properties</p>
                        </div>
                    </Link>
                </div>
                <div className="dashboard-card">
                    <Link to="/seller-sales" className="dashboard-link">
                        <div className="dashboard-item">
                            <h2>Sales</h2>
                            <p>Track your property sales and commissions</p>
                        </div>
                    </Link>
                </div>
                <div className="dashboard-card">
                    <Link to="/seller-analytics" className="dashboard-link">
                        <div className="dashboard-item">
                            <h2>Analytics</h2>
                            <p>View performance and insights about your listings</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
