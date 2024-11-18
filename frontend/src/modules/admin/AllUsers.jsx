import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  Box,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/admin/getallusers",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setAllUser(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleStatus = async (userid, status) => {
    try {
      console.log("Updating status for:", userid, "to:", status);
      const response = await axios.post(
        "http://localhost:5001/api/admin/handlestatus",
        { userid, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Response:", response.data); 
      getAllUser();
    } catch (error) {
      console.error("Error updating status:", error); 
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" mb={3} color="textPrimary" style={{textAlign:"center"}}>
        All Users
      </Typography>

      <Grid container spacing={3}>
        {allUser.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: "#4CAF50",
                        width: 56,
                        height: 56,
                        mr: 2,
                      }}
                    >
                      {user.name[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="h6">{user.name}</Typography>
                  </Box>
                  {user.type === "Owner" && (
                    <>
                      {user.granted === "ungranted" ? (
                        <Button
                          onClick={() => handleStatus(user._id, "granted")}
                          size="small"
                          variant="contained"
                          color="success"
                        >
                          Grant
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleStatus(user._id, "ungranted")}
                          size="small"
                          variant="outlined"
                          color="error"
                        >
                          Revoke
                        </Button>
                      )}
                    </>
                  )}
                </Box>
                <Typography variant="body2" color="textSecondary">
                  <strong>User ID:</strong> {user._id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Type:</strong> {user.type}
                </Typography>

                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {user.type === "Admin" ? (
                    <Chip
                      icon={<AdminPanelSettingsIcon />}
                      label="Admin"
                      color="primary"
                      size="small"
                    />
                  ) : user.type === "Owner" ? (
                    <>
                      <Chip
                        icon={<AssignmentIndIcon />}
                        label="Owner"
                        color="secondary"
                        size="small"
                      />
                      <Chip
                        label={user.granted}
                        color={user.granted === "granted" ? "success" : "error"}
                        size="small"
                      />
                    </>
                  ) : (
                    <Chip
                      icon={<VerifiedUserIcon />}
                      label="Renter"
                      color="default"
                      size="small"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllUsers;
