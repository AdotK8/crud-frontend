import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Database
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/matching" className={styles.navLink}>
            Matching
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/map" className={styles.navLink}>
            Map
          </Link>
        </li>
      </ul>
    </nav>
  );
}
