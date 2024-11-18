import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import { UserContext } from "../../../App";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home"; 
import BusinessIcon from "@mui/icons-material/Business"; 
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListIcon from "@mui/icons-material/List"; 

const Sidebar = styled(Box)(({ theme }) => ({
  width: "250px",
  backgroundColor: "#f8f9fa",
  borderRight: "1px solid #ddd",
  padding: theme.spacing(2),
  minHeight: "85vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OwnerHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-dark py-3 shadow">
        <Container fluid>
          <Navbar.Brand href="/" className="text-info fs-3">
            HomiFind
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            />
            <Nav>
              <h5 className="mx-3 text-white">Hi {user.userData.name}</h5>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Box sx={{ width: "100%" }} display="flex">
        <Sidebar>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Add Property" icon={<HomeIcon />} {...a11yProps(0)} />
            <Tab
              label="All Properties"
              icon={<BusinessIcon />}
              {...a11yProps(1)}
            />
            <Tab label="All Bookings" icon={<ListIcon />} {...a11yProps(2)} />{" "}
          </Tabs>

          <Link
            onClick={handleLogOut}
            to={"/"}
            className="btn btn-danger"
            style={{
              width: "100%",
              marginTop: "auto", 
            }}
          >
            <ExitToAppIcon style={{ marginRight: "8px" }} />
            Log Out
          </Link>
        </Sidebar>

        <MainContent>
          <CustomTabPanel value={value} index={0}>
            <AddProperty />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllProperties />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AllBookings />
          </CustomTabPanel>
        </MainContent>
      </Box>
    </div>
  );
};

export default OwnerHome;
