import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/movies">Movies</Link>
      </li>
      <li>
        <Link to="/customers">Customers</Link>
      </li>
      <li>
        <Link to="/rentals">Rentals</Link>
      </li>
      <li>
        <Link to="/login">Log in</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );
};

export default NavBar;
