import React from "react";
import "./welcomePage.css";
import { useNavigate } from "react-router-dom";

export const WelcomePage = () => {

    const navigate = useNavigate();
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">
          Welcome to <span className="highlight">The Social Hub</span>
        </h1>

        <p className="welcome-text">
          Your one-stop hub for exciting events — meet, explore, and experience like never before!
        </p>

        <button className="explore-button" onClick={()=>{navigate('/events')}}>Explore Events</button>
      </div>
    </div>
  );
};
