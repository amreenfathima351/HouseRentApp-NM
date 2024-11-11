import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import AllPropertiesCards from "../user/AllPropertiesCards";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-dark">
        <Container fluid>
          <Navbar.Brand href="/" className="text-white">
            HomiFind
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav>
              <Link to={"/"} className="text-white">
                Home
              </Link>
              <Link to={"/login"} className="text-white">
                Login
              </Link>
              <Link to={"/register"} className="text-white">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>

      <div className="home-body">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              src="https://wallpapers.com/images/featured/house-u7pcf18vqolaatio.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://wallpapers.com/images/featured/home-background-7b2dfoqu6cgnl7r1.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://i.pinimg.com/originals/93/e1/0e/93e10e06e28a305bbb1f9be260cec04f.png"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://images7.alphacoders.com/550/550587.jpg"
              alt="Fourth slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="property-content">
        <div className="text-center">
          <h1 className="m-1 p-5">All Properties that may you look for</h1>
          <p style={{ fontSize: 15, fontWeight: 800 }}>
            Want to post your Property?{" "}
            <Link to={"/register"}>
              <Button variant="outline-info">Register as Owner</Button>
            </Link>
          </p>
        </div>

        <Container>
          <AllPropertiesCards />
        </Container>
      </div>
    </>
  );
};

export default Home;
