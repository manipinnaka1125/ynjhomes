import React from 'react';
import { Link } from 'react-router-dom';
// Assuming the Navbar component is ready
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../cssfiles/BuyerDashboard.css'; // CSS file for dashboard styling



const BuyerDashboard = () => {
  // Sample data for quick stats
 
  const stats = {
    totalPropertiesViewed: 25,
    savedProperties: 8,
    recentInquiries: 3
  };

  // Sample suggested properties (this can be dynamic)
  const suggestedProperties = [
    { id: 1, title: '3 BHK Apartment in Downtown', price: '$400,000' },
    { id: 2, title: 'Luxury Villa in Suburbs', price: '$750,000' },
    { id: 3, title: 'Modern Condo Near the Beach', price: '$600,000' }
  ];

  return (

   
    <div className="dashboard-container">
     
      
      <div className="dashboard-main-content">
        <div className="dashboard-header">
          <h1>Welcome Back, John Doe!</h1>
          <p>Your personal real estate assistant</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Properties Viewed</h3>
            <p>{stats.totalPropertiesViewed}</p>
          </div>
          <div className="stat-card">
            <h3>Saved Properties</h3>
            <p>{stats.savedProperties}</p>
          </div>
          <div className="stat-card">
            <h3>Recent Inquiries</h3>
            <p>{stats.recentInquiries}</p>
          </div>
        </div>

        <div className="search-section">
          <h2>Find Your Dream Property</h2>
          <input type="text" placeholder="Search for properties..." className="search-input" />
          <button className="search-btn">Search</button>
        </div>

        <div className="suggested-properties">
          <h2>Suggested Properties</h2>
          <div className="property-cards">
            {suggestedProperties.map(property => (
              <div className="property-card" key={property.id}>
                <h3>{property.title}</h3>
                <p>{property.price}</p>
                <Link to={`/property/${property.id}`} className="view-btn">View Details</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>Viewed "3 BHK Apartment in Downtown" - 2 hours ago</li>
            <li>Inquired about "Luxury Villa in Suburbs" - 1 day ago</li>
            <li>Saved "Modern Condo Near the Beach" - 3 days ago</li>
          </ul>
        </div>
      </div>

      <ToastContainer />
    </div>
  
  );
};

export default BuyerDashboard;
