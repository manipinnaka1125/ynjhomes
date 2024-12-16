import React, { useState, useEffect } from "react";
import axios from "axios";
import "../cssfiles/Projects.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom"; // To handle redirection

const Projects = () => {
  const [projects, setProjects] = useState([]); // Array to hold the property data
  const [showAll, setShowAll] = useState(false); // State to control showing more projects
  const navigate = useNavigate(); // Hook for redirection

  // Fetch the properties when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch properties from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/properties");
      setProjects(response.data); // Set the fetched properties to state
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  // Function to get the image URL from the backend
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ""; // Return empty string if no image path exists
    return `http://localhost:8080/api/files/${imagePath}`; // Adjust URL based on your backend configuration
  };

  // Handle "Unlock" button click (redirect to /register)
  const handleUnlock = () => {
    navigate("/register"); // Redirect to /register
  };

  return (
    <div className="projects-container">
      <h1 className="projects-heading">Our Selected Projects</h1>
      <h2 className="projects-subheading">Featured Properties</h2>
      <p className="projects-description">
        As your trusted home builder, we're creating new home communities with the location, amenities, home designs, and lifestyle you deserve.
      </p>
      <div className="projects-wrapper">
        {/* Display only 3 or 4 projects initially */}
        {projects.slice(0, showAll ? projects.length : 4).map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-card-overlay">
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="project-image"
              />
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Display View More / Locked Symbol */}
      {!showAll && (
        <div className="view-more-container">
          <button className="view-more-btn" onClick={() => setShowAll(true)}>
            View More
          </button>
          <div className="locked-symbol">
            <span role="img" aria-label="lock">
              🔒
            </span>
            <button className="unlock-btn" onClick={handleUnlock}>
              Unlock to View All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
