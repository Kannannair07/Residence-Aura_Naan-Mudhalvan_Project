import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddProperty from './AddProperty';
import AllProperties from './AllProperties';
import AllBookings from './AllBookings';
import logo from '../../../images/logo.webp';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        backgroundColor: '#ffffff',
        boxShadow: value === index ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px auto',
        maxWidth: '95%',
        transition: 'all 0.3s ease-in-out',
      }}
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const OwnerHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!user) {
    return null;
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      {/* Navbar Section */}
      <Navbar
        expand="lg"
        style={{
          backgroundColor: '#417871',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '10px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Container fluid style={{ display: 'flex', alignItems: 'center' }}>
          <Navbar.Brand style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '60px',
                height: '60px',
                marginRight: '15px',
                borderRadius: '50%',
                border: '3px solid #fff',
              }}
            />
            <h2
              style={{
                fontWeight: 'bold',
                fontFamily: "'Brush Script MT', cursive",
                color: '#F39C12',
                letterSpacing: '1px',
              }}
            >
              Residence Aura+
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
              navbarScroll
            ></Nav>
            <Nav style={{ display: 'flex', alignItems: 'center' }}>
              <h5
                style={{
                  color: '#ffffff',
                  marginRight: '20px',
                  fontSize: '18px',
                  fontWeight: '500',
                }}
              >
                Hi {user.userData.name}
              </h5>
              <Link
                onClick={handleLogOut}
                to={'/'}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  backgroundColor: '#F39C12',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#D35400';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#F39C12';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Tabs Section */}
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            margin: '0 auto',
            maxWidth: '80%',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: '#F39C12',
                height: '4px',
              },
            }}
          >
            <Tab
              label="Add Property"
              {...a11yProps(0)}
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                textTransform: 'capitalize',
                color: value === 0 ? '#F39C12' : '#34495E',
                transition: 'color 0.3s',
              }}
            />
            <Tab
              label="All Properties"
              {...a11yProps(1)}
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                textTransform: 'capitalize',
                color: value === 1 ? '#F39C12' : '#34495E',
                transition: 'color 0.3s',
              }}
            />
            <Tab
              label="All Bookings"
              {...a11yProps(2)}
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                textTransform: 'capitalize',
                color: value === 2 ? '#F39C12' : '#34495E',
                transition: 'color 0.3s',
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AddProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperties />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default OwnerHome;
