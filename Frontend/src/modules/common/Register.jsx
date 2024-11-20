import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { message } from 'antd';
import logo from '../../images/logo.webp';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.name || !data?.email || !data?.password || !data?.type) return alert("Please fill all fields");
    else {
      axios.post('http://localhost:8001/api/user/register', data)
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            navigate('/login');
          } else {
            message.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Navbar with title, logo, and links */}
      <Navbar expand="lg" style={{ backgroundColor: '#417871', padding: '20px 30px', borderBottom: '2px solid #0056b3', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Container fluid>
          <Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '60px', height: '60px', marginRight: '15px', borderRadius: '50%' }} />
            <h2 style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Brush Script' }}>Residence Aura+</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {/* Additional Navigation Links */}
            </Nav>
            <Nav style={{ fontSize: '18px' }}>
              <Link to={'/'} style={{ margin: '0 20px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Home</Link>
              <Link to={'/login'} style={{ margin: '0 20px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Login</Link>
              <Link to={'/register'} style={{ margin: '0 20px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container component="main" style={{
        background: '#d7ccde',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '500px',
        marginTop: '50px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: '#007BFF' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: '#007BFF', fontFamily: 'Arial, sans-serif' }}>
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Renter Full Name/Owner Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
              style={{ marginBottom: '20px' }}
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
              style={{ marginBottom: '20px' }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              style={{ marginBottom: '20px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="type"
              value={data.type}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '20px' }}
            >
              <MenuItem value="" disabled>Select User</MenuItem>
              <MenuItem value="Renter">Renter</MenuItem>
              <MenuItem value="Owner">Owner</MenuItem>
            </Select>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '100%', backgroundColor: '#007BFF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '30px' }}
            >
              Sign Up
            </Button>
            <Grid container style={{ marginTop: '20px' }}>
              <Grid item>
                Have an account? 
                <Link to="/login" style={{ color: 'blue', marginLeft: '5px', textDecoration: 'none' }}>
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
