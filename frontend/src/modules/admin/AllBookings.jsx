import { message} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);

  const getAllBooking = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/admin/getallbookings",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch bookings.");
    }
  };

  useEffect(() => {
    getAllBooking();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        All Bookings
      </Typography>
      <Grid container spacing={3}>
        {allBookings.length > 0 ? (
          allBookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                  boxShadow: 3,
                  borderRadius: 2,
                  marginBottom: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircleIcon fontSize="small" color="success" />
                    <Typography variant="h6" fontWeight="bold">
                      Booking ID: {booking._id}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon fontSize="small" />
                    <Typography variant="body2" color="textSecondary">
                      <strong>Owner ID:</strong> {booking.ownerID}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <HomeIcon fontSize="small" />
                    <Typography variant="body2" color="textSecondary">
                      <strong>Property ID:</strong> {booking.propertyId}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon fontSize="small" />
                    <Typography variant="body2" color="textSecondary">
                      <strong>Tenant Name:</strong> {booking.userName}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon fontSize="small" />
                    <Typography variant="body2" color="textSecondary">
                      <strong>Tenant Contact:</strong> {booking.phone}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                      <strong>Status:</strong>{" "}
                      <Chip
                        label={booking.bookingStatus}
                        color="primary"
                        size="small"
                      />
                    </Typography>
                  </Stack>

                  
                </Stack>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            align="center"
            sx={{ width: "100%", marginTop: 2 }}
            color="textSecondary"
          >
            No bookings found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AllBookings;
