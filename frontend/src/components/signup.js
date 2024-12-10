import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
      cnic: "",
      name: "",
      email: "",
      phone: "",
      province: "",
      city: "",
      constituency: "",
      dateOfBirth: "",
      password: "",
    });
    
    const navigate = useNavigate(); // Use navigate to redirect after signup
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
          // Correct structure for the POST request
          const signupData = {
            cnic: formData.cnic,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: {
              province: formData.province,
              city: formData.city,
              constituency: formData.constituency,
            },
            dateOfBirth: formData.dateOfBirth,
            password: formData.password,
          };
      
          const response = await axios.post("http://localhost:5000/voter/signup", signupData);
      
          if (response.status === 200 || response.status === 201) {
            alert("Signup successful!");
            console.log("Response data:", response.data);
            navigate("/"); // Redirect to login page
          } else {
            alert("Unexpected response from the server. Please try again.");
          }
        } catch (error) {
          if (error.response) {
            // If the server responds with a status other than 2xx
            console.error("Server responded with an error:", error.response.data);
            alert(`Signup failed: ${error.response.data.message || "Invalid input"}`);
          } else {
            console.error("Error during signup:", error);
            alert("Signup failed. Please try again later.");
          }
        }
      };
      
  // Styling
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a2b2d, #0f1d1f)",
    color: "white",
  };

  const leftSectionStyle = {
    flex: 1,
    background: "linear-gradient(135deg, #1a2b2d, #0f1d1f)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const rightSectionStyle = {
    flex: 1,
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  };

  const formStyle = {
    background: "white",
    color: "black",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "450px",
  };

  const formGroupStyle = {
    
    marginBottom: "1rem",
    display: "flex",
    gap: "70px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const inputStyle = {
    flex: 1,
    padding: "0.8rem",
    border: "1px solid #ddd",
    borderRadius: "5px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.9rem",
    border: "none",
    borderRadius: "5px",
    background: "#1a2b2d",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    background: "#0072ff",
  };

  const linkStyle = {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "14px",
  };

  const loginSpanStyle = {
    color: "#00c6ff",
    cursor: "pointer",
  };



  return (
    <div style={containerStyle}>
      {/* Left Section */}
      <div style={leftSectionStyle}></div>

      {/* Right Section */}
      <div style={rightSectionStyle}>
        <form style={formStyle} onSubmit={handleSignup}>
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Signup</h2>
          {/* Two fields on the same line */}
          <div style={formGroupStyle}>
            <div>
              <label htmlFor="cnic" style={labelStyle}>
                CNIC
              </label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                placeholder="Enter CNIC"
                value={formData.cnic}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="name" style={labelStyle}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
          </div>
          <div style={formGroupStyle}>
            <div>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" style={labelStyle}>
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter Phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
          </div>
          <div style={formGroupStyle}>
            <div>
              <label htmlFor="province" style={labelStyle}>
                Province
              </label>
              <input
                type="text"
                id="province"
                name="province"
                placeholder="Enter Province"
                value={formData.province}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="city" style={labelStyle}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
          </div>
          <div style={formGroupStyle}>
            <div>
              <label htmlFor="constituency" style={labelStyle}>
                Constituency
              </label>
              <input
                type="text"
                id="constituency"
                name="constituency"
                placeholder="Enter Constituency"
                value={formData.constituency}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="dateOfBirth" style={labelStyle}>
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
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
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.background = buttonHoverStyle.background)}
            onMouseOut={(e) => (e.target.style.background = "#1a2b2d")}
          >
            Signup Now
          </button>
          <div style={linkStyle}>
            Already a member?{" "}
            <span onClick={() => navigate("/")} style={loginSpanStyle}>
              Login Now
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
