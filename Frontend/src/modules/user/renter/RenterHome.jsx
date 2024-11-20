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
import AllPropertiesCards from '../AllPropertiesCards';
import AllProperty from './AllProperties';
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
        backgroundColor: '#f9f9f9',
        boxShadow: value === index ? '0px 4px 15px rgba(0, 0, 0, 0.1)' : 'none',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
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

const RenterHome = () => {
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
      <Navbar expand="lg" style={{ backgroundColor: '#007bff', color: '#fff', padding: '15px 20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Container fluid style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '60px',
              height: '60px',
              marginRight: '15px',
              borderRadius: '50%',
              border: '2px solid #fff',
            }}
          />
          <h2
            style={{
              fontWeight: 'bold',
              fontFamily: "'Brush Script MT', cursive",
              color: '#F39C12',
              letterSpacing: '1px',
              marginBottom: '0',
            }}
          >
            Residence Aura+
          </h2>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>
            <Nav style={{ display: 'flex', alignItems: 'center' }}>
              <h5 className="mx-3" style={{ color: '#fff', marginBottom: '0', fontWeight: '600' }}>
                Hi {user.userData.name}
              </h5>
              <Link
                onClick={handleLogOut}
                to={'/'}
                style={{
                  color: '#F39C12',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  border: '2px solid #F39C12',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#F39C12';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#F39C12';
                }}
              >
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{
              fontWeight: 'bold',
              color: '#007bff',
              fontSize: '1.1rem',
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#F39C12',
                height: '3px',
              },
            }}
          >
            <Tab
              label="All Properties"
              {...a11yProps(0)}
              style={{
                fontWeight: value === 0 ? 'bold' : 'normal',
                color: value === 0 ? '#F39C12' : '#007bff',
                transition: 'color 0.3s',
              }}
            />
            <Tab
              label="Booking History"
              {...a11yProps(1)}
              style={{
                fontWeight: value === 1 ? 'bold' : 'normal',
                color: value === 1 ? '#F39C12' : '#007bff',
                transition: 'color 0.3s',
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Container>
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </Container>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperty />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default RenterHome;
