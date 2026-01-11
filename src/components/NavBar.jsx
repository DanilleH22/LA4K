import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand="lg"  sticky="top" style={{ color: 'white' }}>
      <Container>
        <Navbar.Brand href="#">LA4K</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse
          id="navbar-collapse"
          className="d-flex justify-content-end align-items-center"
        >
          <Nav className="me-3">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#portfolio">Portfolio</Nav.Link>
          </Nav>
          <Button href="#contact" variant="primary">
            Get Started
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
