import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { message } from "antd";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login"; // Import the login icon

const Login = () => {
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

    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    } else {
      axios
        .post("http://localhost:8001/api/user/login", data)
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
                  message.error(
                    "Your account is not yet confirmed by the admin"
                  );
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
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark">
        <Container fluid>
          <Navbar.Brand href="/" className="text-white">
            HomiFind
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 "
              style={{ maxHeight: "100px"}}
              navbarScroll
            ></Nav>
            <Nav>
              <Link to={"/"} className="text-white">
                Home
              </Link>
              <Link to={"/login"} className="text-white">
                Login
              </Link>
              <Link to={"/register"} className="text-white">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                Forgot password?{" "}
                <Link to="/forgotpassword" style={{ color: "red" }}>
                  Click Here
                </Link>
              </Grid>
              <Grid item xs>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "blue" }}>
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
