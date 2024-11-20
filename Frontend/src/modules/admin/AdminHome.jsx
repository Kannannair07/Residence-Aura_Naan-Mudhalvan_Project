import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllUsers from './AllUsers';
import AllProperty from './AllProperty';
import AllBookings from './AllBookings';
import logo from '../../images/logo.webp';

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
        background: '#f8f9fa',
        borderRadius: '10px',
        marginTop: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: '#495057' }}>
            {children}
          </Typography>
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

const AdminHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!user) {
    return null;
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#e9ecef', minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: '#343a40', padding: '10px 20px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
        <Container fluid>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '60px', height: '60px', marginRight: '15px', borderRadius: '50%', border: '2px solid #007bff' }}
          />
          <h2 style={{ color: '#f8f9fa', fontWeight: 'bold', fontFamily: 'Brush Script MT, cursive', margin: '0' }}>
            Residence Aura+
          </h2>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>
            <Nav style={{ alignItems: 'center' }}>
              <h5
                style={{
                  color: '#f8f9fa',
                  marginRight: '20px',
                  fontWeight: '600',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Hi {user.userData.name}
              </h5>
              <Link
                to={'/'}
                onClick={handleLogOut}
                style={{
                  textDecoration: 'none',
                  color: '#007bff',
                  fontWeight: 'bold',
                  padding: '8px 15px',
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  transition: '0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#f8f9fa')}
              >
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Tabs Section */}
      <Box sx={{ width: '100%' }} style={{ marginTop: '20px', padding: '0 20px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            TabIndicatorProps={{ style: { backgroundColor: '#007bff', height: '3px' } }}
          >
            <Tab
              label="All Users"
              {...a11yProps(0)}
              style={{
                fontWeight: value === 0 ? 'bold' : 'normal',
                fontFamily: "'Poppins', sans-serif",
                color: value === 0 ? '#007bff' : '#6c757d',
                transition: '0.3s',
              }}
            />
            <Tab
              label="All Properties"
              {...a11yProps(1)}
              style={{
                fontWeight: value === 1 ? 'bold' : 'normal',
                fontFamily: "'Poppins', sans-serif",
                color: value === 1 ? '#007bff' : '#6c757d',
                transition: '0.3s',
              }}
            />
            <Tab
              label="All Bookings"
              {...a11yProps(2)}
              style={{
                fontWeight: value === 2 ? 'bold' : 'normal',
                fontFamily: "'Poppins', sans-serif",
                color: value === 2 ? '#007bff' : '#6c757d',
                transition: '0.3s',
              }}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <AllUsers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default AdminHome;
