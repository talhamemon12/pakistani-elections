import React, { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CandidateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { candidateIdd } = location.state || {};

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      setError("No valid authentication token found.");
      setLoading(false);
      return;
    }

    if (!candidateIdd) {
      setError("Candidate ID is missing.");
      setLoading(false);
      return;
    }

    const requestData = { candidateId: candidateIdd };

    axios
      .post("http://localhost:5000/voter/candidiate-details", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCandidateData(response.data.candidate);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(`Error ${error.response.status}: ${error.response.data.message || "Failed to load candidate data."}`);
        } else if (error.request) {
          setError("Network error: Could not reach the server.");
        } else {
          setError("Unexpected error: " + error.message);
        }
        setLoading(false);
      });
  }, [candidateIdd]);

  

  const castVote = async () => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      alert("Authentication token is missing. Please log in.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/voter/cast-vote",
        { candidateId: candidateIdd },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(`Vote successfully cast for candidate ID: ${candidateIdd}`);
      navigate("/vote-casted");
    } catch (error) {
      console.error("Failed to cast vote:", error);
      alert("Failed to cast vote. Please try again.");
    }
  };

  const renderBox = (title, content) => (
    <div style={styles.box}>
      <h3 style={styles.boxTitle}>{title}</h3>
      <div>{content}</div>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!candidateData) {
    return <div>No candidate data available.</div>;
  }

  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    placeOfBirth,
    nationality,
    religion,
    maritalStatus,
    spouse,
    children,
    education,
  } = candidateData;

  const fullName = `${firstName} ${lastName}`;
  const handleLogout = () => {
    // Perform logout tasks here, such as clearing session storage or cookies (if necessary)
    // For example:
    // sessionStorage.removeItem("user");
    // localStorage.removeItem("user");

    // Navigate to the login page
    navigate("/"); // This will redirect the user to the login page ("/")
  };
  const navigateToCastVote = () => {
    // Perform logout tasks here, such as clearing session storage or cookies (if necessary)
    // For example:
    // sessionStorage.removeItem("user");
    // localStorage.removeItem("user");

    // Navigate to the login page
    navigate("/cast-vote"); // This will redirect the user to the login page ("/")
  };
  const navigateToHome = () => {
    // Perform logout tasks here, such as clearing session storage or cookies (if necessary)
    // For example:
    // sessionStorage.removeItem("user");
    // localStorage.removeItem("user");

    // Navigate to the login page
    navigate("/welcome")};
    const navigateToResults = () =>{
      navigate("/election-results")
    };
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pakistan Election Portal</h1>
        <nav style={styles.navbar}>
        <a onClick={navigateToHome} href="" style={styles.navLink}>Home</a>
        <a onClick = {navigateToCastVote} href="" style={styles.navLink}>Cast Vote</a>
        <a onClick = {navigateToResults} href="" style={styles.navLink}>Election Results</a>
          <a href="" style={styles.navLink}>Discussion Forums</a>
          <a href="" style={styles.navLink}>Contact us</a>
          <a onClick={handleLogout} href="" style={styles.navLink}>log out</a>
        </nav>
      </header>

      <section style={styles.profileSection}>
        <h2 style={styles.profileTitle}>Candidate Profile</h2>
        {renderBox("Personal Details", (
          <div>
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Gender:</strong> {gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Place of Birth:</strong> {placeOfBirth}</p>
            <p><strong>Nationality:</strong> {nationality}</p>
            <p><strong>Religion:</strong> {religion}</p>
            <p><strong>Marital Status:</strong> {maritalStatus}</p>
          </div>
        ))}

        {spouse &&
          renderBox("Spouse Details", (
            <div>
              <p><strong>Name:</strong> {spouse.name}</p>
              <p><strong>Date of Birth:</strong> {spouse.dateOfBirth ? new Date(spouse.dateOfBirth).toLocaleDateString() : "Not mentioned"}</p>
              <p><strong>Occupation:</strong> {spouse.occupation || "Not mentioned"}</p>
            </div>
          ))}

        {children &&
          renderBox("Children Details", (
            <div>
              {children.length > 0 ? (
                children.map((child, index) => (
                  <div key={index}>
                    <p><strong>Name:</strong> {child.name}</p>
                    <p><strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Occupation:</strong> {child.occupation}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Not mentioned</p>
              )}
            </div>
          ))}

        {renderBox("Education", (
          <div>
            {education && education.length > 0
              ? education.map((edu, index) => (
                  <p key={index}>
                    <strong>{edu.degree}:</strong> {edu.institution} ({edu.year})
                  </p>
                ))
              : "Not mentioned"}
          </div>
        ))}

        <button
          onClick={castVote}
          style={styles.voteButton}
        >
          Cast Vote for {fullName}
        </button>
      </section>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 Pakistan Election Portal. All rights reserved.</p>
        <p style={styles.footerText}>Made with care for democracy.</p>
      </footer>
    </div>
  );
};

const styles = {
    container: {
      fontFamily: "'Roboto', sans-serif",
      color: "#1a2b2d",
      backgroundColor: "#ffffff",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    header: {
      backgroundColor: "#1a2b2d",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
    },
    title: {
      color: "#ffffff",
      fontSize: "28px",
      fontFamily: "'Roboto Slab', serif",
      margin: 0,
    },
    navbar: {
      display: "flex",
      gap: "15px",
    },
    navLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "500",
    },
    profileSection: {
      padding: "50px 20px",
      backgroundColor: "#f9f9f9",
      textAlign: "left",
    },
    profileTitle: {
      fontSize: "32px",
      marginBottom: "20px",
      color: "#1a2b2d",
    },
    box: {
      backgroundColor: "#1a2b2d",
      padding: "20px",
      margin: "20px 0",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      color: "#ffffff", // Text color inside the box
    },
    boxTitle: {
      fontSize: "20px",
      marginBottom: "10px",
      color: "#ffffff", // Box title text color
    },
    voteButton: {
      marginTop: "20px",
      padding: "15px 30px",
      backgroundColor: "#1a2b2d",
      color: "#ffffff",
      fontSize: "18px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
    footer: {
      backgroundColor: "#1a2b2d",
      textAlign: "center",
      padding: "20px",
      color: "#ffffff",
      marginTop: "auto",
    },
    footerText: {
      fontSize: "14px",
      margin: "5px 0",
      fontWeight: "400",
    },
  };
  

export default CandidateProfile;
