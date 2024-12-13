import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "../cssfiles/Register.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer", // default role
    otp: "",
    otpSent: false,
    emailVerified: false,
  });

  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [message, setMessage] = useState("");
  const [emailStatus, setEmailStatus] = useState(""); // New state for email status

  useEffect(() => {
    let interval;
    if (formData.otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      toast.error("OTP expired! Please request a new OTP.");
      window.location.reload(); // Refresh page when timer expires
    }
    return () => clearInterval(interval);
  }, [formData.otpSent, timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Please enter a valid email address";
    if (!formData.password) formErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/user/send-otp?email=${formData.email}`
        );
        setFormData({ ...formData, otpSent: true });
        setMessage(response.data); // Show success message
        toast.success("OTP sent successfully!");
      } catch (error) {
        console.error("Error sending OTP:", error);
        setMessage("Failed to send OTP. Please try again later.");
        toast.error("Failed to send OTP.");
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/validate-otp",
        {
          email: formData.email,
          otp: parseInt(formData.otp),
          name: formData.name,
          password: formData.password,
          role: formData.role,
        }
      );
      if (response.status === 200) {
        setFormData({ ...formData, emailVerified: true });
        toast.success("Email verified successfully!");
        window.location.reload(); // Refresh page on successful verification
      }
    } catch (error) {
      toast.error("Invalid OTP, please try again.");
    }
  };

  const checkEmailAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/check-email?email=${formData.email}`
      );
      setEmailStatus(response.data); // Set the response message
      if (response.status === 200) {
        setEmailStatus("Email is available.");
        toast.success("Email is available.");
      }
    } catch (error) {
      setEmailStatus("Email is already registered.");
      toast.error("Email is already registered.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-right">
        <h1 className="register-title">Create Your Account</h1>
        <p className="register-description">
          Join us and start your real estate journey today!
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <button type="button" onClick={checkEmailAvailability} className="check-email-btn">
              Check Email
            </button>
            {emailStatus && <p className="email-status">{emailStatus}</p>}
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!emailStatus || emailStatus === "Email is already registered."}
              required
              className="form-input"
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={!emailStatus || emailStatus === "Email is already registered."}
              required
              className="form-input"
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            {formData.otpSent ? "Send OTP" : "Register"}
          </button>
        </form>

        {formData.otpSent && !formData.emailVerified && (
          <form onSubmit={handleOtpSubmit} className="otp-form">
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="otp-timer">
              {timer > 0 ? (
                <p>OTP expires in: {timer}s</p>
              ) : (
                <p>OTP expired!</p>
              )}
            </div>
            <button type="submit" className="register-btn">
              Verify OTP
            </button>
          </form>
        )}

        <div className="signin-link">
          <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
