import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VotePage = () => {
    const navigate = useNavigate();
    const [electionData, setElectionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigateToveiwCandidiate = (candidateIdd) => {
        navigate("/view-candidiate", { state: { candidateIdd } });
    };
    // Fetch election details and candidates[] on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/"); // If no token, redirect to login page
            return;
        }

        axios
            .get("http://localhost:5000/voter/election-details", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setElectionData(response.data.election);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching election data.");
                setLoading(false);
            });
    }, [navigate]);

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
    const handleVote = (candidateId) => {
        console.log(`Voted for candidate ID: ${candidateId}`);
        // Logic for casting vote goes here
    };

    if (loading) {
        return <div>Loading election details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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

            {/* Candidates Section */}
            <section style={styles.candidateSection}>
                <h3 style={styles.candidateTitle}>Candidates for Election</h3>
                <div style={styles.candidateCardsContainer}>
                    {electionData.candidates.map((candidate) => (
                        <div key={candidate.id} style={styles.candidateCard}>
                            <h4 style={styles.candidateName}>{candidate.fullName}</h4>
                            <p style={styles.candidateDetail}>Gender: {candidate.gender}</p>
                            <p style={styles.candidateDetail}>Date of Birth: {new Date(candidate.dateOfBirth).toLocaleDateString()}</p>
                            <p style={styles.candidateDetail}>Place of Birth: {candidate.placeOfBirth}</p>
                            <p style={styles.candidateDetail}>Party: {candidate.partyMembership}</p>
                            <button
                            style={styles.voteButton}
                            onClick={() => navigateToveiwCandidiate(candidate.id)}  // Pass candidate ID
                            >
                            View Profile
                            </button>
                        </div>
                    ))}
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
  hero: {
    textAlign: "center",
    padding: "60px 20px",
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
    fontWeight: "400",
  },
  candidateSection: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#1a2b2d",
    flexGrow: 1,
  },
  candidateTitle: {
    fontSize: "30px",
    fontFamily: "'Roboto Slab', serif",
    marginBottom: "20px",
    color: "white",
  },
  candidateCardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", // Center the cards horizontally
    gap: "20px", // Space between the cards
  },
  candidateCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "calc(33% - 20px)", // Ensure 3 cards fit in a row
    boxSizing: "border-box", // Prevent padding from affecting width
    marginBottom: "20px",
  },
  candidateName: {
    fontSize: "24px",
    color: "#1a2b2d",
    fontWeight: "500",
  },
  candidateDetail: {
    fontSize: "18px",
    color: "#1a2b2d",
    marginBottom: "8px",
  },
  voteButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#1a2b2d",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
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

export default VotePage;
