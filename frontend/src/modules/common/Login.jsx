import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  InputAdornment,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { message } from "antd";
import NavBar from "./NavBar";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return alert("Please fill all fields");
    }
    axios
      .post("http://localhost:5001/api/user/login", data)
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          const isLoggedIn = JSON.parse(localStorage.getItem("user"));
          switch (isLoggedIn.type) {
            case "Admin":
              navigate("/adminhome");
              break;
            case "Renter":
              navigate("/renterhome");
              break;
            case "Owner":
              if (isLoggedIn.granted === "ungranted") {
                message.error("Your account is not yet confirmed by the admin");
              } else {
                navigate("/ownerhome");
              }
              break;
            default:
              navigate("/login");
              break;
          }
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("User doesn't exist");
        }
        navigate("/login");
      });
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 5, p: 4 }}>
          <CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                <LoginIcon />
              </Avatar>
            </Box>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={handleChange}
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
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={handleChange}
                sx={{ mb: 3 }}
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
                sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold", mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center" mt={3}>
                <Grid item xs={12} md={6} textAlign="center">
                  <Typography variant="body2">
                    Forgot Password{" "}
                    <Link
                      to="/forgotpassword"
                      style={{ color: "#d32f2f", fontWeight: "500" }}
                    >
                      Click Here
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} textAlign="center">
                  <Typography variant="body2">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      style={{ color: "#1976d2", fontWeight: "500" }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
