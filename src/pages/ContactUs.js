import React from 'react';
import '../cssfiles/ContactUs.css';

const ContactUs = () => {
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
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email*</label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Your Message" required />
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
