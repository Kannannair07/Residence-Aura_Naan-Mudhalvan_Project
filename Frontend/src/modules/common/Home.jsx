import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../images/p1.png';
import p2 from '../../images/p2.png';
import p3 from '../../images/p3.png';
import p4 from '../../images/p4.jpg';
import AllPropertiesCards from '../user/AllPropertiesCards';
import logo from '../../images/logo.webp'; // Assuming logo is at this path

const Home = () => {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   return (
      <>
         {/* Navbar with title, logo, and links */}
         <Navbar
            expand="lg"
            style={{
               backgroundColor: '#417871',
               padding: '20px 30px',
               borderBottom: '2px solid #0056b3',
               boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
         >
            <Container fluid>
               <Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Logo and Title */}
                  <img
                     src={logo}
                     alt="Logo"
                     style={{
                        width: '60px',
                        height: '60px',
                        marginRight: '15px',
                        borderRadius: '50%',
                     }}
                  />
                  <h2
                     style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: 'Brush Script',
                     }}
                  >
                     Residence Aura+
                  </h2>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav
                     className="me-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                     {/* Additional Navigation Links */}
                  </Nav>
                  <Nav style={{ fontSize: '18px' }}>
                     <Link
                        to={'/'}
                        style={{
                           margin: '0 20px',
                           color: 'white',
                           textDecoration: 'none',
                           fontWeight: '500',
                           transition: 'color 0.3s',
                        }}
                     >
                        Home
                     </Link>
                     <Link
                        to={'/login'}
                        style={{
                           margin: '0 20px',
                           color: 'white',
                           textDecoration: 'none',
                           fontWeight: '500',
                           transition: 'color 0.3s',
                        }}
                     >
                        Login
                     </Link>
                     <Link
                        to={'/register'}
                        style={{
                           margin: '0 20px',
                           color: 'white',
                           textDecoration: 'none',
                           fontWeight: '500',
                           transition: 'color 0.3s',
                        }}
                     >
                        Register
                     </Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* Carousel Section */}
         <div
            className="home-body"
            style={{ maxWidth: '100%', overflow: 'hidden' }}
         >
            <Carousel
               activeIndex={index}
               onSelect={handleSelect}
               style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
               }}
            >
               <Carousel.Item>
                  <img
                     src={p1}
                     alt="First slide"
                     style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                     }}
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p3}
                     alt="Second slide"
                     style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                     }}
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p2}
                     alt="Third slide"
                     style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                     }}
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p4}
                     alt="Fourth slide"
                     style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                     }}
                  />
               </Carousel.Item>
            </Carousel>
         </div>


         {/* Property Content Section */}
         <div
            className="property-content"
            style={{
               padding: '40px 20px',
               backgroundColor: '#f8f9fa',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               textAlign: 'center',
            }}
         >
            <div
               className="text-center"
               style={{
                  marginBottom: '40px',
                  maxWidth: '800px',
               }}
            >
               <h1
                  style={{
                     fontSize: '42px',
                     fontWeight: 'bold',
                     color: '#333',
                     marginBottom: '25px',
                     lineHeight: '1.3',
                     fontFamily: 'Arial, sans-serif',
                  }}
               >
                  All Properties That May Interest You
               </h1>

               {/* Flex container to align text and button */}
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '20px',
                     flexWrap: 'wrap',
                  }}
               >
                  <p
                     style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#555',
                        margin: '0',
                        lineHeight: '1.6',
                     }}
                  >
                     Want to post your Property?
                  </p>

                  <Link to={'/register'}>
                     <Button
                        variant="outline-info"
                        style={{
                           borderColor: '#007BFF',
                           color: '#007BFF',
                           fontSize: '16px',
                           padding: '12px 30px',
                           borderRadius: '30px',
                           fontWeight: '600',
                           transition: 'all 0.3s ease',
                           boxShadow: '0 6px 12px rgba(0, 123, 255, 0.3)',
                           textTransform: 'uppercase',
                           letterSpacing: '1px',
                        }}
                        onMouseEnter={(e) =>
                           (e.target.style.backgroundColor = '#007BFF')
                        }
                        onMouseLeave={(e) =>
                           (e.target.style.backgroundColor = 'transparent')
                        }
                     >
                        Register as Owner
                     </Button>
                  </Link>
               </div>
            </div>

            {/* Responsive container for the property cards */}
            <Container
               style={{
                  
                  gap: '20px',
                  marginTop: '40px',
               }}
            >
               <AllPropertiesCards />
            </Container>
         </div>
      </>
   );
};

export default Home;
