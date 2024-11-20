import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // For Show/Hide Password
import axios from 'axios';
import logo from '../../images/logo.webp';
import InputAdornment from '@mui/material/InputAdornment';  // For positioning the icons inside input fields

const ForgotPassword = () => {
   const navigate = useNavigate();
   const [data, setData] = useState({
      email: '',
      password: '',
      confirmPassword: ''
   });
   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (data.email === "" || data.password === "" || data.confirmPassword === "") {
         alert("Please fill all fields");
      } else {
         if (data.password === data.confirmPassword) {
            await axios.post("http://localhost:8001/api/user/forgotpassword", data)
               .then((res) => {
                  if (res.data.success) {
                     alert('Your password has been changed!');
                     navigate('/login');
                  } else {
                     alert(res.data.message);
                  }
               })
               .catch((err) => {
                  if (err.response && err.response.status === 401) {
                     alert("User doesn't exist");
                  }
                  navigate("/register");
               });
         } else {
            alert("Passwords do not match.");
         }
      }
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
                  <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />
                  <Nav style={{ fontSize: '18px' }}>
                     <Link to={'/'} style={{ margin: '0 20px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Home</Link>
                     <Link to={'/login'} style={{ margin: '0 20px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Login</Link>
                     <Link to={'/register'} style={{ margin: '0 20px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}> {/* Added marginTop here */}
            <Box
               sx={{
                  background: '#d7ccde',
                  borderRadius: '8px',
                  padding: '30px',
                  maxWidth: '500px',
                  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto', // Center the container
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: '#007BFF' }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial, sans-serif', color: '#007BFF' }}>
                  Forgot Password?
               </Typography>
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ position: 'relative' }}>
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
                     label="New Password"
                     type={showPassword ? "text" : "password"}
                     id="password"
                     autoComplete="current-password"
                     style={{ marginBottom: '20px' }}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <div
                                 onClick={() => setShowPassword(!showPassword)}
                                 style={{
                                    cursor: 'pointer',
                                    color: '#007BFF',
                                 }}
                              >
                                 {showPassword ? <Visibility /> : <VisibilityOff />}
                              </div>
                           </InputAdornment>
                        ),
                     }}
                  />

                  <TextField
                     margin="normal"
                     fullWidth
                     name="confirmPassword"
                     value={data.confirmPassword}
                     onChange={handleChange}
                     label="Confirm Password"
                     type={showConfirmPassword ? "text" : "password"}
                     id="confirmPassword"
                     autoComplete="current-password"
                     style={{ marginBottom: '20px' }}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <div
                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                 style={{
                                    cursor: 'pointer',
                                    color: '#007BFF',
                                 }}
                              >
                                 {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                              </div>
                           </InputAdornment>
                        ),
                     }}
                  />

                  <Box mt={2}>
                     <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{
                           width: '200px',
                           backgroundColor: '#007BFF',
                           color: '#fff',
                           fontWeight: 'bold',
                           textTransform: 'none',
                           borderRadius: '30px',
                           display: 'block',
                           margin: '0 auto',
                        }}
                     >
                        Change Password
                     </Button>
                  </Box>
                  <Grid container style={{ marginTop: '20px' }}>
                     <Grid item>Don't have an account?
                        <Link style={{ color: "red", marginLeft: '5px', textDecoration: 'none' }} to={'/register'}>
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

export default ForgotPassword;
