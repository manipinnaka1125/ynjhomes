import React, { useState } from 'react';
import axios from 'axios';
import "../cssfiles/Footer.css"; // Ensure you have the correct path to your CSS file

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Ensure email is not empty
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/subscribe', { email });
      setMessage(response.data); // Set success message from backend
      setEmail(""); // Clear the email input field
    } catch (error) {
      setMessage("Failed to subscribe. Please try again."); // Error message
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about-us">
          <h3>About Us</h3>
          <p>
            As your trusted home builder, we're creating new home communities with the location, amenities, home designs, and lifestyle you deserve. Our goal is to make your dream home a reality, providing quality, comfort, and convenience in every project.
          </p>
        </div>

        <div className="footer-section useful-links">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/coupons">Coupons</a></li>
            <li><a href="/faq">Faq</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms & Service</a></li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h3>Contact</h3>
          <p>
            3245 Peachtree Parkway, #D451, Suwanee, GA, USA 30024
          </p>
          <p>
            <a href="mailto:naveen@ynjhomes.com">naveen@ynjhomes.com</a>
          </p>
          <p>+1 770 298 1014</p>
        </div>

        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest news and offers. Subscribe to our newsletter:</p>
          <form onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p className="subscription-message">{message}</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
