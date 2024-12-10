import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const App = () => {
    const navigate = useNavigate();
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
        navigate("/welcome"); // This will redirect the user to the login page ("/")
      };
      
      const navigateToResults = () =>{
        navigate("/election-results")
      };
  return (
    <div style={styles.container}>
      {/* Header Section */}
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

      {/* Hero Section */}
      <section style={styles.hero}>
        <h2 style={styles.heroTitle}>Transparent & Secure Elections</h2>
        <p style={styles.heroText}>
          Conducting elections with integrity and trust. Your vote matters.
        </p>

        {/* Button Sections */}
        <div style={styles.buttonSections}>
          <div style={styles.buttonSection}>
            <img
              src="/images/voting-box (1).png"
              alt="vote icon"
              style={styles.icon}
            />
            <p style={styles.sectionText}>Cast Your Vote</p>
            <button onClick = {navigateToCastVote} style={styles.button}>Cast Vote</button>
          </div>

          <div style={styles.buttonSection}>
            <img
              src="/images/polling.png"
              alt="results icon"
              style={styles.icon}
            />
            <p style={styles.sectionText}>View Election Results</p>
            <button onClick = {navigateToResults} style={styles.button}>View Results</button>
          </div>

          <div style={styles.buttonSection}>
            <img
              src="/images/networking.png"
              alt="forum icon"
              style={styles.icon}
            />
            <p style={styles.sectionText}>View Discussion Forums</p>
            <button style={styles.button}>View Forums</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
    fontFamily: "'Roboto Slab', serif",  // Use a slab serif for headings
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
    fontWeight: "500", // Medium weight for better readability
  },
  hero: {
    textAlign: "center",
    padding: "100px 20px",
    backgroundColor: "#ffffff",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: "36px",
    fontFamily: "'Roboto Slab', serif",  // Use a slab serif for headings
    marginBottom: "20px",
    color: "#1a2b2d",
  },
  heroText: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#1a2b2d",
    fontWeight: "400", // Regular weight for body text
  },
  buttonSections: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "30px",
    flexWrap: "wrap",
  },
  buttonSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    maxWidth: "300px",
  },
  icon: {
    width: "50px",
    height: "50px",
    marginBottom: "15px",
  },
  sectionText: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "#1a2b2d",
    fontWeight: "500", // Medium weight for headings inside button sections
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#1a2b2d",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500", // Make the button text stand out with medium weight
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
    fontWeight: "400", // Regular weight for footer text
  },
};

export default App;
