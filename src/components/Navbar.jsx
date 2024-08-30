import React from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
  const location = useLocation();
  const activeKey = location.pathname; // Current route path

  return (
    <Nav
      justify
      variant="tabs"
      activeKey={activeKey}
      className={styles.navbarCustom}
    >
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/"
          eventKey="/"
          className={styles.navLinkCustom}
        >
          Developments
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/matching"
          eventKey="/matching"
          className={styles.navLinkCustom}
        >
          Matching
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/map"
          eventKey="/map"
          className={styles.navLinkCustom}
        >
          Map
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
