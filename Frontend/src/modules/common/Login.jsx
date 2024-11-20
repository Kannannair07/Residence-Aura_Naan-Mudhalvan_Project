import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { message } from 'antd';
import logo from '../../images/logo.webp';

const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data?.email || !data?.password) {
      return message.warning("Please fill all fields");
    }

    try {
      const res = await axios.post('http://localhost:8001/api/user/login', data);

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
            navigate("/ownerhome");
            if (isLoggedIn.granted === 'ungranted') {
              message.error('Your account is not yet confirmed by the admin');
            } else {
              navigate("/ownerhome");
            }
            break;
          default:
            navigate("/renterhome");
            break;
        }
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("User doesn't exist");
      }
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#417871', padding: '20px 30px', borderBottom: '2px solid #0056b3', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Container fluid>
          <Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '60px', height: '60px', marginRight: '15px', borderRadius: '50%' }} />
            <h2 style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Brush Script' }}>Residence Aura+</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
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
          <Avatar sx={{ bgcolor: '#007BFF', mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial, sans-serif', color: '#007BFF' }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
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
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                )
              }}
            />
            <Box mt={3} sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  width: '220px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: '30px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                }}
              >
                Sign In
              </Button>
            </Box>
            <Grid container style={{ marginTop: '20px' }}>
              <Grid item style={{ marginBottom: '10px' }}>
                Forgot password?
                <Link style={{ color: "red", marginLeft: '5px', textDecoration: 'none' }} to={'/forgotpassword'}>
                  Click here
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link style={{ color: "blue", marginLeft: '5px', textDecoration: 'none' }} to={'/register'}>
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
