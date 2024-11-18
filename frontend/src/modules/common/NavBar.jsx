import React from 'react'
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";

const NavBar = () => {
    return (
      <Navbar expand="lg" className="bg-dark py-3 shadow">
        <Container fluid>
          <Navbar.Brand href="/" className="text-info fs-3">
            HomiFind
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Link
                to={"/"}
                className="text-white mx-3 fs-5 text-decoration-none"
              >
                Home
              </Link>
              <Link
                to={"/login"}
                className="text-white mx-3 fs-5 text-decoration-none"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="text-white mx-3 fs-5 text-decoration-none"
              >
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default NavBar