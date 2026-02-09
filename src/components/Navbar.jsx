import React from "react";
import "./Navbar.css";
import { useEventContext } from "../context/context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { loggedIn, userLogOut, user } = useEventContext();
  return (
    <div className="navbar">
      <h2 className="navbar-logo">The Social Hub</h2>

      <div className="navbar-actions">
        {loggedIn ? (
          <>
            <Link to="/dashboard" className="navbar-button">
              Dashboard
            </Link>
            <Link to="/profile" className="navbar-button">
              Profile
            </Link>
            {user.role === "Admin" && (
              <>
                <Link to="/" className="navbar-button">
                  Admin
                </Link>
                <Link to="/organizerRequestsPage" className="navbar-button">
                  Organizer
                </Link>
              </>
            )}
            <button
              className="navbar-button"
              style={{
                backgroundColor: "red",
                padding: "5px",
                borderRadius: "4px",
              }}
              onClick={userLogOut}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="navbar-button">
              Signup
            </Link>
            <Link to="/login" className="navbar-button">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
