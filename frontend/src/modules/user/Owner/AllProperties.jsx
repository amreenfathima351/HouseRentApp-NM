import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { message } from "antd";

const AllProperties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [show, setShow] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editingPropertyData, setEditingPropertyData] = useState({
    propertyType: "",
    propertyAdType: "",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
  });

  useEffect(() => {
    getAllProperty();
  }, []);

  const getAllProperty = async () => {
    try {
      message.loading("Loading properties...", 0); 
      const response = await axios.get(
        "http://localhost:5001/api/owner/getallproperties",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      message.destroy(); 
      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      message.destroy();
      message.error("Failed to load properties");
      console.log(error);
    }
  };

  const handleShow = (propertyId) => {
    const propertyToEdit = allProperties.find(
      (property) => property._id === propertyId
    );
    if (propertyToEdit) {
      setEditingPropertyId(propertyId);
      setEditingPropertyData(propertyToEdit);
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingPropertyData({ ...editingPropertyData, [name]: value });
  };

  const saveChanges = async () => {
    try {
      message.loading("Saving changes...", 0); 
      const res = await axios.patch(
        `http://localhost:5001/api/owner/updateproperty/${editingPropertyId}`,
        editingPropertyData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      message.destroy(); 
      if (res.data.success) {
        message.success(res.data.message);
        getAllProperty();
        handleClose();
      } else {
        message.error("Failed to save changes");
      }
    } catch (error) {
      message.destroy();
      console.log(error);
      message.error("Failed to save changes");
    }
  };

  const handleDelete = async (propertyId) => {
    let assure = window.confirm("Are you sure to delete?");
    if (assure) {
      try {
        message.loading("Deleting property...", 0); 
        const response = await axios.delete(
          `http://localhost:5001/api/owner/deleteproperty/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.destroy(); 
        if (response.data.success) {
          message.success(response.data.message);
          getAllProperty();
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.destroy();
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" className="mb-4 text-center">
        Property Listings
      </Typography>
      <Row className="mb-4">
        {allProperties.map((property) => {
          const propertyImage = property.propertyImage?.[0]?.path
            ? `http://localhost:5001${property.propertyImage[0].path}`
            : "https://via.placeholder.com/150"; 

          return (
            <Col key={property._id} sm={12} md={6} lg={4}>
              <Card className="mb-3 shadow-sm">
                {property.propertyImage && (
                  <Card.Img
                    variant="top"
                    src={propertyImage}
                    alt={`${property.propertyType} image`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{property.propertyType}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {property.propertyAdType}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Address:</strong> {property.propertyAddress}
                    <br />
                    <strong>Owner Contact:</strong> {property.ownerContact}
                    <br />
                    <strong>Amount:</strong> Rs.{property.propertyAmt}
                    <br />
                    <strong>Available:</strong>{" "}
                    {property.isAvailable ? "Yes" : "No"}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShow(property._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(property._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Property Type</Form.Label>
                <Form.Select
                  name="propertyType"
                  value={editingPropertyData.propertyType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land/plot">Land/Plot</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Ad Type</Form.Label>
                <Form.Select
                  name="propertyAdType"
                  value={editingPropertyData.propertyAdType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="propertyAddress"
                value={editingPropertyData.propertyAddress}
                onChange={handleChange}
                placeholder="Enter full address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Owner Contact</Form.Label>
              <Form.Control
                type="text"
                name="ownerContact"
                value={editingPropertyData.ownerContact}
                onChange={handleChange}
                placeholder="Enter contact number"
              />
            </Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Text>Rs. </InputGroup.Text>
              <Form.Control
                type="number"
                name="propertyAmt"
                value={editingPropertyData.propertyAmt}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </InputGroup>
            <Button variant="primary" className="w-100" onClick={saveChanges}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AllProperties;
