import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <button>
        <Link to="/login">Logout</Link>
      </button>
    </div>
  );
};

export default Navbar;
