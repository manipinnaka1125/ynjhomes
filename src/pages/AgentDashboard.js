import React from "react";
import { Link } from "react-router-dom";
import "../cssfiles/AgentDashboard.css"; // Import the CSS file

const AgentDashboard = () => {
    return (
        <div className="agent-dashboard-container">
            <div className="agent-dashboard-header">
                <h1>Welcome to Your Dashboard, Agent</h1>
                <p>Manage your properties, inquiries, and clients</p>
            </div>
            <div className="agent-dashboard-body">
                <div className="dashboard-card">
                    <Link to="/agent-properties" className="dashboard-link">
                        <div className="dashboard-item">
                            <h2>Properties</h2>
                            <p>View and manage your listed properties</p>
                        </div>
                    </Link>
                </div>
                <div className="dashboard-card">
                    <Link to="/agent-inquiries" className="dashboard-link">
                        <div className="dashboard-item">
                            <h2>Inquiries</h2>
                            <p>View client inquiries and responses</p>
                        </div>
                    </Link>
                </div>
                <div className="dashboard-card">
                    <Link to="/agent-clients" className="dashboard-link">
                        <div className="dashboard-item">
                            <h2>Clients</h2>
                            <p>Manage your clients and their needs</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AgentDashboard;
