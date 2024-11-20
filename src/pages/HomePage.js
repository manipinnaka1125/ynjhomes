import React, { useState, useEffect, useRef } from "react";
import "../cssfiles/HomePage.css";
import foundersimage from "../images/foundersimage.jpg"; // Add your founder's photo here

import banner2a from "../images/banner2a.jpg";

import banner2c from "../images/banner2c.jpg";
import banner1b from "../images/banner1b.jpg";
import banner1 from "../images/banner1.jpg";
// Different image sets for each slideshow
const images1 = [banner2c, banner2a, banner2c];
const images2 = [banner1b, banner2c, banner1];
const images3 = [banner2a, banner1b, banner2a];

const delay = 2500;

const HomePage = () => {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [showMore, setShowMore] = useState(false); // State to control visibility of more content

  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  // Handle the automatic transition for each slideshow
  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(() => {
      setIndex1((prevIndex) => (prevIndex === images1.length - 1 ? 0 : prevIndex + 1));
      setIndex2((prevIndex) => (prevIndex === images2.length - 1 ? 0 : prevIndex + 1));
      setIndex3((prevIndex) => (prevIndex === images3.length - 1 ? 0 : prevIndex + 1));
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index1, index2, index3]);

  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">YNJ Homes - The Right Home for You</h1>
          <p className="hero-subtitle">
            Find, Buy, Rent, or Sell your dream home with confidence.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </header>

      <section className="founder-section">
        <div className="founder-container">
          <div className="founder-card">
            <img src={foundersimage} alt="Founder" className="founder-photo" />
            <div className="founder-message">
              <h3>Construction Services & Real Estate needs in Georgia</h3>
              <p>
                Whether you are looking for a new home or resale home in North Georgia, we are here to help.
              </p>
              <button className="show-more-button" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show Less" : "Show More"}
              </button>
              {showMore && (
                <div className="more-content">
                  <h3>Real Estate Agency In Suwanee/Cumming</h3>
                  <p>
                  We have a deep understanding of the marketplace, and trained for every aspect of the buying process. Our customized client approach and progressive thinking has made buying real estate with us a smooth process for all. Whether you are a first timer or a seasoned buyer the process of buying a home can be challenging!
                  </p>
                  <h3>Construction Services</h3>
                  <p>
                  Either new construction or Rennovation we can help. Permits, Engineering work, Preparing Homesite, Laying the Foundation, Framing the Home, all MEP work. We are licensed residential builders and can take up start to finish. We can build home that's a perfect match for your budget, taste and lifestyle.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-us-section">
        <h2 className="section-title">WHY CHOOSE US</h2>
        <p className="section-subtitle">Building Today For Better Futures</p>
        <p className="section-description">
          We build energy-efficient custom homes, renovations, and additions to existing dwellings.
        </p>
        <div className="why-choose-content">
          <div className="why-choose-card">
            <img src={banner1} alt="Engineers" className="why-choose-image" />
            <p className="why-choose-text">We are young, talented, and certified engineers.</p>
          </div>
          <div className="why-choose-card">
            <img src={banner1b} alt="Quality Projects" className="why-choose-image" />
            <p className="why-choose-text">
              We deliver quality projects on time, ensuring your satisfaction.
            </p>
          </div>
        </div>
        <button className="cta-button1">GET A CONSULTATION</button>
      </section>

      {/* Slideshow Cards */}
     
       
      <div className="card-container">
  {/* Slideshow Card 1 */}
  <section className="card">
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index1 * 100}%, 0, 0)` }}
      >
        {images1.map((image, idx) => (
          <div className="slide" key={idx}>
            <img src={image} alt={`Slide ${idx + 1}`} className="slide-image" />
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {images1.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot ${index1 === idx ? "active" : ""}`}
            onClick={() => setIndex1(idx)}
          />
        ))}
      </div>
    </div>
    <div className="card-content">
      <h3>Explore Innovative Designs</h3>
      <p>
        Discover the future of technology and design with our cutting-edge solutions. From sleek, modern aesthetics to functional efficiency, our products are designed to fit into every space seamlessly.
      </p>
    </div>
  </section>

  {/* Slideshow Card 2 */}
  <section className="card">
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index1 * 100}%, 0, 0)` }}
      >
        {images2.map((image, idx) => (
          <div className="slide" key={idx}>
            <img src={image} alt={`Slide ${idx + 1}`} className="slide-image" />
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {images2.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot ${index1 === idx ? "active" : ""}`}
            onClick={() => setIndex1(idx)}
          />
        ))}
      </div>
    </div>
    <div className="card-content">
      <h3>Efficiency at its Best</h3>
      <p>
        Achieve unprecedented efficiency with our products that are designed to enhance productivity and simplify daily tasks. Whether for business or home use, our solutions bring value to every aspect of your life.
      </p>
    </div>
  </section>

  {/* Slideshow Card 3 */}
  <section className="card">
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index1 * 100}%, 0, 0)` }}
      >
        {images3.map((image, idx) => (
          <div className="slide" key={idx}>
            <img src={image} alt={`Slide ${idx + 1}`} className="slide-image" />
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {images3.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot ${index1 === idx ? "active" : ""}`}
            onClick={() => setIndex1(idx)}
          />
        ))}
      </div>
    </div>
    <div className="card-content">
      <h3>Ultimate Customer Experience</h3>
      <p>
        We prioritize customer satisfaction above all else. Our designs and services are tailored to provide you with the ultimate user experience, ensuring every interaction is smooth, seamless, and enjoyable.
      </p>
    </div>
  </section>
</div>

        
    
    </div>
  );
};

export default HomePage;
