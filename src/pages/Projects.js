import React from "react";
import "../cssfiles/Projects.css"; // Import the CSS file for styling
import g1 from "../images/g1.jpg";
import g2 from "../images/g2.jpg";
import g3 from "../images/g3.jpg";


const projects = [
  {
    id: 1,
    title: "Gainesville, GA",
    description: "As your trusted home builder, we're creating new home communities with the location, amenities, home designs, and lifestyle you deserve.",
    image: g1, // Replace with your actual image path
  },
  {
    id: 2,
    title: "Atlanta, GA",
    description: "Discover beautiful new homes with world-class amenities in Atlanta, Georgia. Your dream home is waiting.",
    image: g2, // Replace with your actual image path
  },
  {
    id: 3,
    title: "Savannah, GA",
    description: "Explore our latest developments in Savannah, Georgia, offering exceptional value, quality, and community-focused living.",
    image: g3, // Replace with your actual image path
  },
  {
    id: 4,
    title: "Charleston, SC",
    description: "Experience modern living with a historic charm in Charleston, SC. Enjoy a variety of home styles in an ideal location.",
    image: g3, // Replace with your actual image path
  },
];

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="projects-heading">Our Selected Projects</h1>
      <h2 className="projects-subheading">Featured Properties</h2>
      <p className="projects-description">
        As your trusted home builder, we're creating new home communities with the location, amenities, home designs, and lifestyle you deserve.
      </p>
      <div className="projects-wrapper">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
