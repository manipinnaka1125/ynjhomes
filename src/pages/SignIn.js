import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../cssfiles/Signin.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // Timer starts at 90 seconds
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Timer logic
  useEffect(() => {
    if (isOtpSent && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer); // Cleanup timer
    } else if (timeLeft === 0) {
      toast.warning("OTP expired. Please try again.");
      window.location.reload(); // Refresh the page when the timer expires
    }
  }, [isOtpSent, timeLeft]);

  // Validate the login form
  const validateForm = () => {
    let formErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    }
    return formErrors;
  };

  // Send OTP for admin
  const sendAdminOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/admin/send-otp", {
        email: formData.email,
      });
      if (response.status === 200) {
        toast.success("Admin OTP sent to your email!");
        setIsOtpSent(true);
        setTimeLeft(90); // Reset timer
      }
    } catch (error) {
      console.error("Error sending OTP for admin:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // Verify OTP for admin
  const verifyAdminOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/admin/verify-otp", {
        email: formData.email,
        otp,
      });
      if (response.status === 200) {
        toast.success("Admin OTP verified successfully!");
        
        // Store token and role in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "admin"); // Hardcoded for admin

        // Redirect to Admin Dashboard
        navigate("/admin-dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying admin OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  // Send OTP for users
  const sendUserOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/userauth/send-otp", {
        email: formData.email,
      });
      if (response.status === 200) {
        toast.success("OTP sent to your email!");
        setIsOtpSent(true);
        setTimeLeft(90); // Reset timer
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // Verify OTP for users
  const verifyUserOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/userauth/verify-otp", {
        email: formData.email,
        otp,
      });
      if (response.status === 200) {
        const user = response.data;
        toast.success("OTP verified successfully!");
        
        // Store token and role in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", user.role);

        // Redirect user based on role
        redirectUserBasedOnRole(user.role);

        // Reload the page to reflect the updated state
        window.location.reload();
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  // Redirect user based on role
  const redirectUserBasedOnRole = (role) => {
    switch (role) {
      case "buyer":
        navigate("/buyer-dashboard");
        break;
      case "seller":
        navigate("/seller-dashboard");
        break;
      case "agent":
        navigate("/agent-dashboard");
        break;
      default:
        toast.error("Unknown role. Please contact support.");
        navigate("/signin");
    }
  };

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      try {
        if (formData.email === "pinnakamaniswaroop@gmail.com" && formData.password === "manipinnaka1125") {
          setIsAdmin(true);
          await sendAdminOtp();
        } else {
          const response = await axios.post("http://localhost:8080/api/user/signin", formData);
          if (response.status === 200) {
            toast.success("Login successful!");
            await sendUserOtp();
          } else {
            toast.error("Invalid email or password. Please try again.");
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Invalid email or password. Please try again.");
        } else {
          console.error("Error during login:", error);
          toast.error("An error occurred. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Sign In</h1>
        <p className="signin-description">
          {isOtpSent ? "Enter the OTP sent to your email." : "Welcome back! Please log in to your account."}
        </p>

        {!isOtpSent ? (
          <form onSubmit={handleSubmit} className="signin-form">
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
                required
                className="form-input"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="signin-btn" disabled={isLoading}>
              {isLoading ? <div className="loading-spinner"></div> : "Sign In"}
            </button>
          </form>
        ) : (
          <div className="otp-form">
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button
              className="signin-btn"
              onClick={isAdmin ? verifyAdminOtp : verifyUserOtp}
            >
              Verify OTP
            </button>
            <p className="timer-text">
              Time remaining: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
