import React from "react";
import s1 from "../images/s1.jpg";
import s2 from "../images/s2.jpg";
import s3 from "../images/s3.jpg";
import s4 from "../images/s4.jpg";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "2em",
    color: "#ffffff",
    fontWeight: 700,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  subheading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.5em",
    color: "#d4e4e5",
    fontWeight: 500,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    paddingTop: "20px",
  },
  card: {
    
    position: "relative",
    width: "300px",  // Ensure it's not maxed out and allows for flexibility
    height: "400px", // Adjusted height to allow enough room for content
    backgroundColor: "#f2f8f9",
    borderRadius: "10px",
    padding: "2em 1.2em",
    margin: "12px",
    textDecoration: "none",
    zIndex: 0,
    overflow: "hidden",
    background: "linear-gradient(to bottom, #c3e6ec, #a7d1d9)",
    fontFamily: "Arial, Helvetica, sans-serif",
    display: "flex",
    flexDirection: "column", // Make sure to allow proper stacking
    justifyContent: "space-between", // Ensures the button is at the bottom
  },
  cardBefore: {
    content: '""',
    position: "absolute",
    zIndex: -1,
    top: "-16px",
    right: "-16px",
    background: "linear-gradient(135deg, #364a60, #384c6c)",
    height: "32px",
    width: "32px",
    borderRadius: "32px",
    transform: "scale(1)",
    transformOrigin: "50% 50%",
    transition: "transform 0.35s ease-out",
  },
  cardHoverBefore: {
    transform: "scale(28)",
  },
  cardTitle: {
    color: "#262626",
    fontSize: "1.5em",
    lineHeight: "normal",
    fontWeight: 700,
    marginBottom: "0.5em",
  },
  cardTitleHover: {
    color: "#ffffff",
    transition: "all 0.5s ease-out",
  },
  smallDesc: {
    fontSize: "1em",
    fontWeight: 400,
    lineHeight: "1.5em",
    color: "#452c2c",
    transition: "all 0.5s ease-out",
  },
  smallDescHover: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  image: {
    width: "100%",
    height: "150px",
    borderRadius: "8px",
    marginBottom: "15px",
    objectFit: "cover",
  },
  button: {
    padding: "10px 15px",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "auto", // Ensures the button is at the bottom of the card
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};


const services = [
  {
    id: 1,
    title: "Buy Property",
    description: "Find your dream home effortlessly.",
    image: s1,
    buttonText: "Add Property",
    emoji: "🏡",
    link: "/register",
  },
  {
    id: 2,
    title: "Sell Property",
    description: "Sell your property at the best value.",
    image: s2,
    buttonText: "Add Property",
    emoji: "🏡",
    link: "/register",
  },
  {
    id: 3,
    title: "Home Improvements",
    description: "Enhance the beauty of your home.",
    image:s3,
    buttonText: "Add Property",
    emoji: "🛠️",
    link: "/register",
  },
  {
    id: 4,
    title: "Rent Property",
    description: "Find rental properties near you.",
    image: s4,
    buttonText: "Browse Rentals",
    emoji: "🏠",
    link: "/register",
  },
];

const Services = () => {
  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    card.querySelector(".card-hover-before").style.transform = styles.cardHoverBefore.transform;
    card.querySelector(".card-title").style.color = styles.cardTitleHover.color;
    card.querySelector(".small-desc").style.color = styles.smallDescHover.color;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.querySelector(".card-hover-before").style.transform = "scale(1)";
    card.querySelector(".card-title").style.color = styles.cardTitle.color;
    card.querySelector(".small-desc").style.color = styles.smallDesc.color;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>What We Do</h1>
      <h2 style={styles.subheading}>Exclusive Services</h2>
      <div style={styles.cardWrapper}>
        {services.map((service) => (
          <div
            key={service.id}
            style={styles.card}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="card"
          >
            <div className="card-hover-before" style={styles.cardBefore}></div>
            <img
              src={service.image}
              alt={service.title}
              style={styles.image}
            />
            <h2 className="card-title" style={styles.cardTitle}>
              {service.title}
            </h2>
            <p className="small-desc" style={styles.smallDesc}>
              {service.description}
            </p>
            <a
              href={service.link}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
            >
              {service.emoji} {service.buttonText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
