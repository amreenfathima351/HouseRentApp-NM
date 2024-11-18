import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import NavBar from "./NavBar";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      alert("Please fill all fields");
    } else if (data.password === data.confirmPassword) {
      try {
        const res = await axios.post(
          "http://localhost:5001/api/user/forgotpassword",
          data
        );
        if (res.data.success) {
          alert("Your password has been changed!");
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("User doesn't exist");
        }
        navigate("/register");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 5, p: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={data.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="New Password"
              type="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, fontWeight: "bold", mt: 3 }}
            >
              Change Password
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "#d32f2f", textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default ForgotPassword;
