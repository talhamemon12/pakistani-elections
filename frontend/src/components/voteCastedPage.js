import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
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
        <h2 style={styles.heroTitle}>Thank You for Casting Your Vote!</h2>
        <p style={styles.heroText}>
          "The future of our nation is shaped by the choices we make today."
        </p>
        <p style={styles.heroSubText}>
          Your vote is a step towards a brighter, more transparent future.
        </p>
        <button onClick={navigateToHome} style={styles.button}>
          Return to Home Page
        </button>
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
    fontFamily: "'Roboto Slab', serif",
    marginBottom: "20px",
    color: "#1a2b2d",
  },
  heroText: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#1a2b2d",
    fontWeight: "400", // Regular weight for body text
  },
  heroSubText: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#1a2b2d",
    fontWeight: "300", // Lighter weight for subtext
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
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0072ff", // Hover effect for button
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

export default ThankYou;
