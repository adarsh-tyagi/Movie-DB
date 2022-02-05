import React from "react";
import "./Header.css";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, user }) => {
  return (
    <div className="header">
      <div className="header__left">
        <MovieFilterIcon />
        <Link to="/">MovieDB</Link>
      </div>
      <div className="header_right">
        {!isAuthenticated ? (
          <>
            <Link to="/signin">
              <p>Sign in</p>
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <img
                  src={user.gender === "male" ? "/images/male.svg" : "/images/female.svg" }
                alt="profile"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
