import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Modal,
  Button,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { blue, green, grey } from "@mui/material/colors";

const AllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/admin/getallproperties",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to load properties. Please try again later.");
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        mb={3}
        color="textPrimary"
        align="center"
        fontWeight="bold"
        sx={{
          color: blue[900],
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        All Properties
      </Typography>

      <Box
        sx={{
          width: "100%",
          padding: 2,
          backgroundColor: blue[50],
          boxShadow: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="h6" fontWeight="bold" color={blue[800]}>
              Property ID
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" fontWeight="bold" color={blue[800]}>
              Owner ID
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" fontWeight="bold" color={blue[800]}>
              Type
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" fontWeight="bold" color={blue[800]}>
              Address
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" fontWeight="bold" color={blue[800]}>
              Contact
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" fontWeight="bold" color={blue[800]}>
              Price
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" fontWeight="bold" color={blue[800]}>
              Ad Type
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" fontWeight="bold" color={blue[800]}>
              Property Image
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "100%" }}>
        {allProperties.map((property) => (
          <Paper
            key={property._id}
            sx={{
              padding: 2,
              boxShadow: 3,
              transition: "transform 0.3s, background-color 0.3s",
              "&:hover": {
                backgroundColor: grey[100],
                transform: "scale(1.02)",
                cursor: "pointer",
              },
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Tooltip title="Property ID" arrow>
                  <Typography variant="body2" color="textPrimary">
                    {property._id}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Owner ID" arrow>
                  <Typography variant="body2" color="textPrimary">
                    {property.ownerId}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Property Type" arrow>
                  <Typography variant="body2" color="textPrimary">
                    {property.propertyType}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Property Address" arrow>
                  <Typography variant="body2" color="textPrimary">
                    {property.propertyAddress}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Contact" arrow>
                  <Typography variant="body2" color="textPrimary">
                    {property.ownerContact}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Price" arrow>
                  <Typography variant="body2" color="textPrimary">
                    ₹{property.propertyAmt.toLocaleString()}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Ad Type" arrow>
                  <Typography variant="body2" color="textPrimary">
                    {property.propertyAdType}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: green[700],
                    borderColor: green[700],
                    "&:hover": {
                      backgroundColor: green[100],
                    },
                  }}
                  onClick={() =>
                    handleImageClick(property.propertyImage[0]?.path)
                  }
                >
                  <ImageIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  View Image
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>

      <Modal
        open={selectedImage !== null}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            backgroundColor: "white",
            padding: 3,
            boxShadow: 24,
            borderRadius: 2,
            textAlign: "center",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: grey[700],
              "&:hover": {
                color: grey[900],
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedImage ? (
            <img
              src={`http://localhost:5001${selectedImage}`}
              alt="Property"
              style={{
                objectFit: "contain",
                width: "50%",
                borderRadius: 8,
              }}
            />
          ) : (
            <Typography variant="h6">Image not available</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AllProperty;
