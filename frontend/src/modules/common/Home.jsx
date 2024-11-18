import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import AllPropertiesCards from "../user/AllPropertiesCards";
import NavBar from "./NavBar";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <NavBar />

      <div className="home-body">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="full-width-carousel"
        >
          <Carousel.Item>
            <img
              src="https://wallpapers.com/images/featured/house-u7pcf18vqolaatio.jpg"
              alt="First slide"
              className="d-block w-100 carousel-img"
            />
            <Carousel.Caption className="carousel-caption">
              <h3>Find Your Dream Home</h3>
              <p>Discover the perfect property that suits your lifestyle.</p>
              <Button variant="light" className="carousel-btn">
                Browse Properties
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://wallpapers.com/images/featured/home-background-7b2dfoqu6cgnl7r1.jpg"
              alt="Second slide"
              className="d-block w-100 carousel-img"
            />
            <Carousel.Caption className="carousel-caption">
              <h3>Luxury Living Spaces</h3>
              <p>Explore luxurious homes in beautiful locations.</p>
              <Button variant="light" className="carousel-btn">
                Explore More
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://i.pinimg.com/originals/93/e1/0e/93e10e06e28a305bbb1f9be260cec04f.png"
              alt="Third slide"
              className="d-block w-100 carousel-img"
            />
            <Carousel.Caption className="carousel-caption">
              <h3>Modern Apartments</h3>
              <p>Find modern apartments with top-notch amenities.</p>
              <Button variant="light" className="carousel-btn">
                Discover Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="property-content my-5">
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4 section-title">
              Explore Our Properties
            </h1>
            <p className="text-muted fs-5 mb-4">
              Want to post your Property?{" "}
              <Link to={"/register"}>
                <Button
                  variant="outline-info"
                  className="fw-semibold register-owner-btn"
                >
                  Register as Owner
                </Button>
              </Link>
            </p>
          </div>

          <Row className="property-grid">
            <AllPropertiesCards />
          </Row>
        </Container>
      </div>

      <style jsx="true">{`
        .full-width-carousel .carousel-img {
          height: 80vh;
          object-fit: cover;
        }
        .carousel-caption {
          background: rgba(0, 0, 0, 0.5);
          padding: 20px;
          border-radius: 10px;
        }
        .carousel-btn {
          font-weight: bold;
          margin-top: 10px;
        }
        .property-content {
          background-color: #f8f9fa;
          padding: 4rem 2rem;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .section-title {
          color: #333;
          position: relative;
          padding-bottom: 10px;
        }
        .section-title::after {
          content: "";
          width: 60px;
          height: 4px;
          background-color: #007bff;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .register-owner-btn {
          font-size: 1.1rem;
        }
        
      `}</style>
    </>
  );
};

export default Home;
