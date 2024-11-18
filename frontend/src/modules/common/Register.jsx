import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { message } from "antd";
import NavBar from "./NavBar";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.type) {
      return alert("Please fill all fields");
    }

    axios
      .post("http://localhost:5001/api/user/register", data)
      .then((response) => {
        if (response.data.success) {
          message.success(response.data.message);
          navigate("/login");
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 5 }}>
          <CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
            </Box>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Create an Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                autoComplete="name"
                autoFocus
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                select
                label="User Type"
                name="type"
                value={data.type}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <option value="" disabled>
                  Select User Type
                </option>
                <option value="Renter">Renter</option>
                <option value="Owner">Owner</option>
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ py: 1.5, fontWeight: "bold", fontSize: "1rem" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center" mt={3}>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{ color: "#1976d2", fontWeight: "500" }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Register;
