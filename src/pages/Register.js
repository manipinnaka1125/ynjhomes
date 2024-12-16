import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../cssfiles/Register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer", // default role
    otp: "",
    otpSent: false,
    emailVerified: false,
    address: "",
    dateOfBirth: "",
    gender: "male", // default gender
  });

  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [autoLocation, setAutoLocation] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false); // Geolocation loading state
  const [isEmailAvailable, setIsEmailAvailable] = useState(false); // Track email availability
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (formData.password) {
      const strength = getPasswordStrength(formData.password);
      setPasswordStrength(strength);
    }
  }, [formData.password]);

  useEffect(() => {
    let interval;
    if (formData.otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      toast.error("OTP expired! Please request a new OTP.");
      setFormData((prev) => ({ ...prev, otpSent: false }));
    }
    return () => clearInterval(interval);
  }, [formData.otpSent, timer]);

  const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) return "Strong";
    if (/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) return "Medium";
    return "Weak";
  };

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
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.dateOfBirth) formErrors.dateOfBirth = "Date of Birth is required";
    return formErrors;
  };

  const checkEmailAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/check-email?email=${formData.email}`
      );
      setEmailStatus(response.data); // Set the response message
      if (response.status === 200) {
        setIsEmailAvailable(true); // Set email availability
        toast.success("Email is available.");
      }
    } catch (error) {
      setEmailStatus("Email is already registered.");
      setIsEmailAvailable(false); // Set email availability to false
      toast.error("Email is already registered.");
    }
  };

  const detectLocation = () => {
    setLocationLoading(true); // Set loading state to true when detecting location
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      setLocationLoading(false); // Set loading state to false on error
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const location = response.data.display_name || "Unable to retrieve location";
          setFormData({ ...formData, address: location });
          setAutoLocation(true);
          toast.success("Location detected successfully!");
        } catch (error) {
          toast.error("Failed to fetch location details.");
        }
        setLocationLoading(false); // Set loading state to false when done
      },
      () => {
        toast.error("Failed to detect location. Please enable location services.");
        setLocationLoading(false); // Set loading state to false on error
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0 && isEmailAvailable) {
      setIsLoading(true);  // Set loading state to true
      try {
        const response = await axios.post(
          `http://localhost:8080/api/user/send-otp?email=${formData.email}`
        
        );
        setFormData({ ...formData, otpSent: true });
        
        toast.success("OTP sent successfully!");
       
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP.");
      } finally {
        setIsLoading(false);  // Set loading state to false after submission
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
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
        }
      );
      if (response.status === 200) {
        setFormData({ ...formData, emailVerified: true });
        toast.success("Email verified successfully!");
        toast.success("you have been registered succesfully");
        toast.success("please login with your credentials");
        navigate("/signin")
      }
    } catch (error) {
      toast.error("Invalid OTP, please try again.");
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
          <div className="form-group-horizontal">
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
          </div>

          <div className="form-group-horizontal">
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
                disabled={!isEmailAvailable} // Disable only if email is not available
              />
              <span className={`password-strength ${passwordStrength.toLowerCase()}`}>
                {passwordStrength} Password
              </span>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
                disabled={!isEmailAvailable} // Disable only if email is not available
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="form-group-horizontal">
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

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="form-input"
              ></textarea>
              <button
                type="button"
                onClick={detectLocation}
                className="detect-location-btn"
                disabled={locationLoading}
              >
                {locationLoading ? (
                  <div className="loading-spinner"></div> // Display spinner when loading
                ) : (
                  "Detect Location"
                )}
              </button>
              {autoLocation && <p className="location-status">Location auto-detected!</p>}
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
          </div>

          <div className="form-group-horizontal">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="form-input"
              />
              {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div> // Show the spinner
            ) : formData.otpSent && !formData.emailVerified ? (
              "Verify OTP"
            ) : (
              "Register"
            )}
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
            <button type="submit" className="register-btn" disabled={timer === 0}>
              Verify OTP
            </button>
          </form>
        )}

        <div className="signin-link">
          <p>
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
