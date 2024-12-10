import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import WelcomePage from "./components/wellcomePage"; // Create this new component for the welcome page
import ProtectedRoute from "./components/ProtectedRoute";
import VotePage from "./components/votePage";
import VeiwCandidate from "./components/veiwCandidate";
import VoteCastedPage from "./components/voteCastedPage";
import ElectionResultsPage from "./components/ElectionResults"; // Import the Election Results Page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cast-vote"
          element={
            <ProtectedRoute>
              <VotePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-candidiate"
          element={
            <ProtectedRoute>
              <VeiwCandidate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vote-casted"
          element={
            <ProtectedRoute>
              <VoteCastedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/election-results" // New route for election results
          element={
            <ProtectedRoute>
              <ElectionResultsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
