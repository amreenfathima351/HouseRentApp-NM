import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Carousel, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { message } from "antd";

const AllPropertiesCards = ({ loggedIn }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [filterPropertyType, setPropertyType] = useState("");
  const [filterPropertyAdType, setPropertyAdType] = useState("");
  const [filterPropertyAddress, setPropertyAddress] = useState("");
  const [propertyOpen, setPropertyOpen] = useState(null);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phone: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleClose = () => setShow(false);

  const handleShow = (propertyId) => {
    setPropertyOpen(propertyId);
    setShow(true);
  };

  const getAllProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/user/getAllProperties"
      );
      setAllProperties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (status, propertyId, ownerId) => {
    try {
      await axios
        .post(
          `http://localhost:5001/api/user/bookinghandle/${propertyId}`,
          { userDetails, status, ownerId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
            handleClose();
          } else {
            message.error(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const filteredProperties = allProperties
    .filter(
      (property) =>
        filterPropertyAddress === "" ||
        property.propertyAddress.includes(filterPropertyAddress)
    )
    .filter(
      (property) =>
        filterPropertyAdType === "" ||
        property.propertyAdType
          .toLowerCase()
          .includes(filterPropertyAdType.toLowerCase())
    )
    .filter(
      (property) =>
        filterPropertyType === "" ||
        property.propertyType
          .toLowerCase()
          .includes(filterPropertyType.toLowerCase())
    );

  return (
    <>
      {/* Filter Section */}

      <div className="filter-container d-flex justify-content-around align-items-center p-3 bg-light shadow-sm">
        <input
          type="text"
          placeholder="Address"
          value={filterPropertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
          className="rounded"
          width={"100%"}
        />
        <select
          className="form-select"
          value={filterPropertyAdType}
          onChange={(e) => setPropertyAdType(e.target.value)}
        >
          <option value="">All Ad Types</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select
          className="form-select"
          value={filterPropertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
          <option value="residential">Residential</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="property-grid container mt-4">
        <Row className="gy-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Col lg={4} md={6} sm={12} key={property._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5001${property.propertyImage[0].path}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <h5 className="card-title">{property.propertyAddress}</h5>
                    <p className="text-muted mb-2">
                      <strong>Type:</strong> {property.propertyType}
                    </p>
                    <p className="text-muted mb-2">
                      <strong>Ad:</strong> {property.propertyAdType}
                    </p>
                    {loggedIn ? (
                      <>
                        <p className="text-muted mb-2">
                          <strong>Owner Contact:</strong>{" "}
                          {property.ownerContact}
                        </p>
                        <p className="text-muted mb-2">
                          <strong>Available:</strong> {property.isAvailable}
                        </p>
                        <p className="text-muted mb-2">
                          <strong>Amount:</strong> Rs.{property.propertyAmt}
                        </p>
                      </>
                    ) : (
                      <p className="text-danger mt-3">
                        Login to view more details
                      </p>
                    )}
                    {loggedIn && property.isAvailable === "Available" ? (
                      <Button
                        variant="outline-dark"
                        onClick={() => handleShow(property._id)}
                        className="mt-2"
                      >
                        Book Now
                      </Button>
                    ) : (
                      !loggedIn && (
                        <Link to="/login">
                          <Button variant="secondary" className="mt-2">
                            Get Info
                          </Button>
                        </Link>
                      )
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">
              No properties available at the moment.
            </p>
          )}
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Property Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {propertyOpen &&
            allProperties.find((property) => property._id === propertyOpen) && (
              <>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  {allProperties
                    .find((property) => property._id === propertyOpen)
                    .propertyImage.map((image, idx) => (
                      <Carousel.Item key={idx}>
                        <img
                          className="d-block w-100"
                          src={`http://localhost:5001${image.path}`}
                          alt={`Slide ${idx + 1}`}
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
                <div className="mt-3">
                  <p>
                    <strong>Location:</strong>{" "}
                    {
                      allProperties.find(
                        (property) => property._id === propertyOpen
                      ).propertyAddress
                    }
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {
                      allProperties.find(
                        (property) => property._id === propertyOpen
                      ).propertyType
                    }
                  </p>
                  <p>
                    <strong>Ad Type:</strong>{" "}
                    {
                      allProperties.find(
                        (property) => property._id === propertyOpen
                      ).propertyAdType
                    }
                  </p>
                  <p>
                    <strong>Amount:</strong> Rs.
                    {
                      allProperties.find(
                        (property) => property._id === propertyOpen
                      ).propertyAmt
                    }
                  </p>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleBooking(
                        "pending",
                        propertyOpen,
                        allProperties.find(
                          (property) => property._id === propertyOpen
                        ).ownerId
                      );
                    }}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        name="fullName"
                        value={userDetails.fullName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Button type="submit" variant="success">
                      Confirm Booking
                    </Button>
                  </Form>
                </div>
              </>
            )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AllPropertiesCards;
