import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/voter/login", {
        cnic,
        password,
      });
  
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token); // Save the token
        alert("Login successful!");
        navigate("/welcome");
      }
    } catch (error) {
      alert("Login failed. Please check your CNIC and password.");
      console.error(error);
    }
  };
  

  // Container styling for background and form layout
  const containerStyle = {
    display: "flex",
    minHeight: "100vh", // Full screen height
  };

  // Left side background styling with an image or icon
  const leftSideStyle = {
    flex: 1, // Takes up half of the width
    background: "linear-gradient(135deg, #1a2b2d, #0f1d1f)", // Dark color theme
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    display: "flex",
    justifyContent: "center", // Center the image
    alignItems: "center", // Center the image vertically
  };

  // Adding a subtle icon or illustration to the left side
  const iconStyle = {
    maxWidth: "30%", // Keep it responsive and professional
    maxHeight: "30%",
    
  };

  // Right side container for the header and form
  const rightSideStyle = {
    flex: 1, // Takes up half of the width
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Stack the header and form vertically
    padding: "20px",
  };

  // Header styling for the main title
  const headerStyle = {
    color: "#1a2b2d",
    fontSize: "36px", // Big font size
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2rem", // Space between header and form
    fontFamily: "'Roboto Slab', serif",
  };

  // Form box styling with shadow and adjusted width
  const formStyle = {
    background: "white",
    padding: "2.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "350px", // Slimmer form
    height: "auto", // Adjust form height
  };

  const formGroupStyle = {
    marginBottom: "1.2rem", // Adjust spacing between form fields
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    fontFamily: "'Roboto Slab', serif",
    fontSize: "16px",
  };

  const inputStyle = {
    width: "90%",
    padding: "0.9rem", // Increased padding for better touch interaction
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const formOptionsStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.2rem", // Adjust spacing
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.9rem",
    border: "none",
    borderRadius: "5px",
    background: "#1a2b2d", // Dark background to match theme
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "500",
  };

  const buttonHoverStyle = {
    background: "#0072ff", // Hover effect for button
  };

  const linkStyle = {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "14px",
  };

  const signupSpanStyle = {
    color: "#00c6ff", // Blue color for signup link
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      {/* Left side with background and icon */}
      <div style={leftSideStyle}>
        
      </div>

      {/* Right side with login form */}
      <div style={rightSideStyle}>
        <h1 style={headerStyle}>Pakistan's Online Voting Platform</h1>
        <form style={formStyle} onSubmit={handleLogin}>
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontFamily: "'Roboto Slab', serif", fontSize: "24px" }}>
            Login
          </h2>
          <div style={formGroupStyle}>
            <label htmlFor="cnic" style={labelStyle}>
              CNIC
            </label>
            <input
              type="text"
              id="cnic"
              placeholder="Enter your CNIC"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={formOptionsStyle}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="#" style={{ color: "#00c6ff" }}>
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.background = buttonHoverStyle.background)}
            onMouseOut={(e) => (e.target.style.background = "#1a2b2d")}
          >
            Login Now
          </button>
          <div style={linkStyle}>
            Not a member?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={signupSpanStyle}
            >
              Signup Now
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
