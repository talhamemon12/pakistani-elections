import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ElectionResults = () => {
    const navigate = useNavigate();
    const [electionData, setElectionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/"); // Redirect to login if no token
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
        navigate("/");
    };

    const navigateToHome = () => {
        navigate("/welcome");
    };

    const navigateToCastVote = () => {
        navigate("/cast-vote");
    };

    if (loading) {
        return <div>Loading election results...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Calculate leading candidate
    const leadingCandidate = electionData.candidatesInfo.reduce((leader, candidate) =>
        candidate.noOfVotes > (leader.noOfVotes || 0) ? candidate : leader, {}
    );

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <header style={styles.header}>
                <h1 style={styles.title}>Pakistan Election Portal</h1>
                <nav style={styles.navbar}>
                    <a onClick={navigateToHome} href="#" style={styles.navLink}>Home</a>
                    <a onClick={navigateToCastVote} href="#" style={styles.navLink}>Cast Vote</a>
                    <a href="#" style={styles.navLink}>Election Results</a>
                    <a href="#" style={styles.navLink}>Discussion Forums</a>
                    <a href="#" style={styles.navLink}>Contact Us</a>
                    <a onClick={handleLogout} href="#" style={styles.navLink}>Log Out</a>
                </nav>
            </header>

            {/* Main Content */}
            <main style={styles.main}>
                {/* Election Details Section */}
                <aside style={styles.detailsSection}>
                    <h3 style={styles.resultsTitle}>{electionData.title}</h3>
                    <p style={styles.resultsDetail}>Date: {new Date(electionData.date).toLocaleDateString()}</p>
                    <p style={styles.resultsDetail}>Status: {electionData.status}</p>
                    <p style={styles.resultsDetail}>Constituency: {electionData.constituency}</p>
                    <div style={styles.leaderSection}>
                        <h3 style={styles.leaderTitle}>Leading Candidate</h3>
                        {leadingCandidate.candidate ? (
                            <div style={styles.leaderCard}>
                                <h4 style={styles.candidateName}>{leadingCandidate.candidate.fullName}</h4>
                                <p style={styles.candidateDetail}>Votes: {leadingCandidate.noOfVotes}</p>
                            </div>
                        ) : (
                            <p style={styles.noVotes}>No votes cast yet.</p>
                        )}
                    </div>
                </aside>

                {/* Candidate Results */}
                <section style={styles.candidatesSection}>
                    {electionData.candidatesInfo.map((info) => (
                        <div key={info.candidate.id} style={styles.candidateCard}>
                            <h4 style={styles.candidateName}>{info.candidate.fullName}</h4>
                            <p style={styles.candidateDetail}>Votes: {info.noOfVotes}</p>
                        </div>
                    ))}
                </section>
            </main>

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
    main: {
        display: "flex",
        padding: "20px",
        gap: "20px",
    },
    detailsSection: {
        flex: "1",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    resultsTitle: {
        fontSize: "24px",
        fontFamily: "'Roboto Slab', serif",
        marginBottom: "10px",
        color: "#1a2b2d",
    },
    resultsDetail: {
        fontSize: "16px",
        color: "#1a2b2d",
        marginBottom: "8px",
    },
    candidatesSection: {
        flex: "2",
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        justifyContent: "space-between",
    },
    candidateCard: {
        backgroundColor: "#1a2b2d",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        width: "calc(33% - 10px)", // 3 cards per row with spacing
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    candidateName: {
        fontSize: "20px",
        fontWeight: "500",
    },
    candidateDetail: {
        fontSize: "16px",
    },
    leaderSection: {
        marginTop: "20px",
    },
    leaderTitle: {
        fontSize: "20px",
        fontWeight: "600",
    },
    leaderCard: {
        marginTop: "10px",
        backgroundColor: "#f1f1f1",
        padding: "10px",
        borderRadius: "8px",
    },
    noVotes: {
        fontSize: "16px",
        color: "#1a2b2d",
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
    },
};

export default ElectionResults;
