import React, { useState } from "react";
import axios from "axios";
import '../cssfiles/ContactUs.css';
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState(""); // To display success/error message
  const [loading, setLoading] = useState(false); // To track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loading animation
    try {
      const response = await axios.post("http://localhost:8080/api/contact/submit", formData);
      
      setMessage(response.data);
      // Show a success toast
      toast.success("Your message has been sent successfully!");
      window.location.reload();
    } catch (error) {
      setMessage("There was an error sending your message. Please try again later.");
      // Show an error toast
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false); // Stop the loading animation
    }
  };

  return (
    <div className="contact-us-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We're here to help. Reach out to us for inquiries, support, or information.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info1">
          <h3>Email YNJ Homes</h3>
          <p><strong>Email:</strong> <a href="mailto:naveen@ynjhomes.com">naveen@ynjhomes.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+17702981014">+1 770 298 1014</a></p>
          <p><strong>Address:</strong> 3245 Peachtree Parkway, #D451, Suwanee, GA, USA 30024</p>
        </div>

        <div className="contact-form">
          <h3>Send us a message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email*</label>
              <input type="email" id="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <div className="spinner"></div> // Loading spinner
              ) : (
                "Send Message"
              )}
            </button>
          </form>
          {message && <p className="response-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
