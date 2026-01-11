import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar expand="lg" sticky="top" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#" className={styles.brand}>
          LA4K
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="navbar-collapse" 
          className={styles.toggle}
        />
        <Navbar.Collapse
  id="navbar-collapse"
  className={styles.navbarCollapse}
>

          <Nav className={`${styles.nav} me-3`}>
            <Nav.Link href="#home" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link href="#about" className={styles.navLink}>
              About
            </Nav.Link>
            <Nav.Link href="#portfolio" className={styles.navLink}>
              Portfolio
            </Nav.Link>
          </Nav>
          <Button href="#contact" variant="primary" className={styles.button}>
            Get Started
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;