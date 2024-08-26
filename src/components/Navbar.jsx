import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Database</Link>
        </li>
        <li>
          <Link to="/matching">Matching</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
      </ul>
    </nav>
  );
}
