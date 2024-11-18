import React, { useState, useEffect } from "react";
import { Container, Button, Col, Form, Row, Card } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";

function AddProperty() {
  const [image, setImage] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "residential",
    propertyAdType: "rent",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
    additionalInfo: "",
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImage(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      propertyImages: image,
    }));
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("propertyType", propertyDetails.propertyType);
    formData.append("propertyAdType", propertyDetails.propertyAdType);
    formData.append("propertyAddress", propertyDetails.propertyAddress);
    formData.append("ownerContact", propertyDetails.ownerContact);
    formData.append("propertyAmt", propertyDetails.propertyAmt);
    formData.append("additionalInfo", propertyDetails.additionalInfo);

    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append("propertyImages", image[i]);
      }
    }

    axios
      .post("http://localhost:5001/api/owner/postproperty", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding property:", error);
      });
  };

  return (
    <Container className="mt-3">
      <Card className="shadow-sm p-3">
        <h3 className="text-center mb-3" style={{ fontSize: "1.5rem" }}>
          Add New Property
        </h3>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Property Type</Form.Label>
                <Form.Select
                  name="propertyType"
                  value={propertyDetails.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land/plot">Land/Plot</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Ad Type</Form.Label>
                <Form.Select
                  name="propertyAdType"
                  value={propertyDetails.propertyAdType}
                  onChange={handleChange}
                  required
                >
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group className="mb-2">
                <Form.Label>Property Address</Form.Label>
                <Form.Control
                  type="text"
                  name="propertyAddress"
                  placeholder="Enter full address"
                  value={propertyDetails.propertyAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Owner Contact No.</Form.Label>
                <Form.Control
                  type="text"
                  name="ownerContact"
                  placeholder="Enter contact number"
                  value={propertyDetails.ownerContact}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Property Amount (in Rs.)</Form.Label>
                <Form.Control
                  type="number"
                  name="propertyAmt"
                  placeholder="Enter amount"
                  value={propertyDetails.propertyAmt}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group className="mb-2">
                <Form.Label>Property Images</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group className="mb-2">
                <Form.Label>Additional Information</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="additionalInfo"
                  placeholder="Enter additional details"
                  value={propertyDetails.additionalInfo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100 py-2">
            Add Property
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddProperty;
