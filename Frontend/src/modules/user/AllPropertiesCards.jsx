import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Carousel, Col, Form, InputGroup, Row } from 'react-bootstrap';
// import { Col, Form, Input, Row, message } from 'antd';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const AllPropertiesCards = ({ loggedIn }) => {
   const [index, setIndex] = useState(0);
   const [show, setShow] = useState(false);
   const [allProperties, setAllProperties] = useState([]);
   const [filterPropertyType, setPropertyType] = useState('');
   const [filterPropertyAdType, setPropertyAdType] = useState('');
   const [filterPropertyAddress, setPropertyAddress] = useState('');
   const [propertyOpen, setPropertyOpen] = useState(null)
   const [userDetails, setUserDetails] = useState({
      fullName: '',
      phone: 0,
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserDetails({ ...userDetails, [name]: value });
   };

   const handleClose = () => setShow(false);

   const handleShow = (propertyId) => {
      setPropertyOpen(propertyId)
      setShow(true)
   };

   const getAllProperties = async () => {
      try {
         const res = await axios.get('http://localhost:8001/api/user/getAllProperties');
         setAllProperties(res.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   const handleBooking = async (status, propertyId, ownerId) => {
      try {
         await axios.post(`http://localhost:8001/api/user/bookinghandle/${propertyId}`, { userDetails, status, ownerId }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         })
            .then((res) => {
               if (res.data.success) {
                  message.success(res.data.message)
                  handleClose()
               }
               else {
                  message.error(res.data.message)
               }
            })
      } catch (error) {
         console.log(error);
      }
   }


   useEffect(() => {
      getAllProperties();
   }, []);



   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   const filteredProperties = allProperties
      .filter((property) => filterPropertyAddress === '' || property.propertyAddress.includes(filterPropertyAddress))
      .filter(
         (property) =>
            filterPropertyAdType === '' ||
            property.propertyAdType.toLowerCase().includes(filterPropertyAdType.toLowerCase())
      )
      .filter(
         (property) =>
            filterPropertyType === '' ||
            property.propertyType.toLowerCase().includes(filterPropertyType.toLowerCase())
      );

   return (
      <>
         {/* <div className=" mt-4 filter-container text-center">
            <p className="mt-3">Filter By: </p>
            <input
               type="text"
               placeholder=": Address"
               value={filterPropertyAddress}
               onChange={(e) => setPropertyAddress(e.target.value)}
            />
            <select value={filterPropertyAdType} onChange={(e) => setPropertyAdType(e.target.value)}>
               <option value="">All Ad Types</option>
               <option value="sale">Sale</option>
               <option value="rent">Rent</option>
            </select>
            <select value={filterPropertyType} onChange={(e) => setPropertyType(e.target.value)}>
               <option value="">All Types</option>
               <option value="commercial">Commercial</option>
               <option value="land/plot">land/Plot</option>
               <option value="residential">Residential</option>
            </select>
         </div> */}






<div className="mt-4 filter-container text-center">
  <p className="filter-title">Filter By:</p>
  <div className="filter-row">
    <input
    style ={{border: '1px solid white;'}}
      type="text"
      placeholder="Address"
      className="filter-input"
      value={filterPropertyAddress}
      onChange={(e) => setPropertyAddress(e.target.value)}
    />
    <select
      className="filter-select"
      value={filterPropertyAdType}
      onChange={(e) => setPropertyAdType(e.target.value)}
    >
      <option value="">All Ad Types</option>
      <option value="sale">Sale</option>
      <option value="rent">Rent</option>
    </select>
    <select
      className="filter-select"
      value={filterPropertyType}
      onChange={(e) => setPropertyType(e.target.value)}
    >
      <option value="">All Types</option>
      <option value="commercial">Commercial</option>
      <option value="land/plot">Land/Plot</option>
      <option value="residential">Residential</option>
    </select>
  </div>
</div>





<div className="d-flex column mt-5" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '30px' }}>
   {filteredProperties && filteredProperties.length > 0 ? (
      filteredProperties.map((property) => (
         <Card 
            border="light" 
            key={property._id} 
            style={{ 
               width: '18rem', 
               marginLeft: 10, 
               backgroundColor: '#0D6164', // Set the background to theme color
               backdropFilter: 'blur(20px)', 
               borderRadius: '15px', 
               boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)', 
               border: '1px solid rgba(255, 255, 255, 0.3)', 
               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
               color: 'white', 
               padding: '20px', 
               backdropBlendMode: 'lighten',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Card.Body style={{ padding: '15px' }}>
               <Card.Title>
                  <img src={`http://localhost:8001${property.propertyImage[0].path}`} alt='photos' style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
               </Card.Title>
               <Card.Text>
                  <p style={{ fontWeight: 600, marginBottom: '10px' }}>Location:<br /> {property.propertyAddress} </p>
                  <p style={{ fontWeight: 600, marginBottom: '10px' }}>Property Type: <br /> {property.propertyType} </p>
                  <p style={{ fontWeight: 600, marginBottom: '10px' }}>Ad Type: <br /> {property.propertyAdType} </p>
                  {!loggedIn ? (
                     <>
                     </> 
                  ) : (
                     <>
                        <p style={{ fontWeight: 600, marginBottom: '10px' }}>Owner Contact: <br /> {property.ownerContact} </p> 
                        <p style={{ fontWeight: 600, marginBottom: '10px' }}>Availability:<br /> {property.isAvailable} </p>
                        <p style={{ fontWeight: 600, marginBottom: '10px' }}>Property Amount: <br /> Rs. {property.propertyAmt}</p>
                     </>
                  )}
               </Card.Text>
               {
                  !loggedIn ? (
                     <>
                        <p style={{ fontSize: '12px', color: '#FF8C00', marginTop: '20px' }}>For more details, click on get info</p>
                        <Link to={'/login'}>
                           <Button 
                              style={{ 
                                 float: 'left', 
                                 backgroundColor: '#ffffff', // Changed to white
                                 color: '#0b0b2b', // Dark text for contrast
                                 borderRadius: '5px', 
                                 border: '1px solid #0b0b2b', // Dark border for consistency
                                 padding: '8px 20px', 
                                 fontSize: '16px', 
                                 fontWeight: 'bold', 
                                 transition: 'background-color 0.3s, border 0.3s' 
                              }} 
                              variant="outline-dark">
                              Get Info
                           </Button>
                        </Link>
                     </>
                  ) : (
                     <div>
                        {
                           property.isAvailable === "Available" ? (
                              <>
                                 <p style={{ float: 'left', fontSize: '12px', color: '#FF8C00' }}>Get More Info of the Property</p>
                                 <Button 
                                    onClick={() => handleShow(property._id)} 
                                    style={{ 
                                       float: 'right', 
                                       backgroundColor: '#ffffff', // Changed to white
                                       color: '#0b0b2b', // Dark text for contrast
                                       borderRadius: '5px', 
                                       border: '1px solid #0b0b2b', // Dark border for consistency
                                       padding: '8px 20px', 
                                       fontSize: '16px', 
                                       fontWeight: 'bold',
                                       transition: 'background-color 0.3s, border 0.3s' 
                                    }}
                                    variant="outline-dark"
                                    onMouseEnter={(e) => {
                                       e.target.style.backgroundColor = '#0b0b2b'; // Change to theme color on hover
                                       e.target.style.color = 'white'; // Change text color to white
                                       e.target.style.border = '1px solid white'; // Change border to white
                                    }}
                                    onMouseLeave={(e) => {
                                       e.target.style.backgroundColor = '#ffffff'; // Revert to white background
                                       e.target.style.color = '#0b0b2b'; // Revert to dark text
                                       e.target.style.border = '1px solid #0b0b2b'; // Revert to dark border
                                    }}>
                                    Get Info
                                 </Button>
                                 <Modal show={show && propertyOpen === property._id} onHide={handleClose}>
                                    <Modal.Header closeButton style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
                                       <Modal.Title style={{ color: '#333' }}>Property Info</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{ backgroundColor: '#f9f9f9', color: '#333' }}>
                                       {property.propertyImage && property.propertyImage.length > 0 && (
                                          <Carousel activeIndex={index} onSelect={handleSelect}>
                                             {property.propertyImage.map((image, idx) => (
                                                <Carousel.Item key={idx}>
                                                   <img 
                                                      src={`http://localhost:8001${image.path}`} 
                                                      alt={`Image ${idx + 1}`} 
                                                      className="d-block w-100" 
                                                      style={{ borderRadius: '8px' }} />
                                                </Carousel.Item>
                                             ))}
                                          </Carousel>
                                       )}
                                       <div>
                                          <div className="d-flex my-3">
                                             <div>
                                                <p className='my-1'><b>Owner Contact:</b> {property.ownerContact} </p>
                                                <p className='my-1'><b>Availability:</b> {property.isAvailable} </p>
                                                <p className='my-1'><b>Property Amount: </b>Rs.{property.propertyAmt}</p>
                                             </div>
                                             <div className="mx-4">
                                                <p className='my-1'><b>Location:</b> {property.propertyAddress} </p>
                                                <p className='my-1'><b>Property Type:</b> {property.propertyType} </p>
                                                <p className='my-1'><b>Ad Type: </b>{property.propertyAdType}</p>
                                             </div>
                                          </div>
                                          <p className='my-1'><b>Additional Info: </b>{property.additionalInfo}</p>
                                       </div>
                                       <hr />
                                       <div>
                                          <span className='w-100'><h4 style={{ color: '#333' }}><b>Your Details to confirm booking</b></h4></span>
                                          <Form onSubmit={(e) => {
                                             e.preventDefault();
                                             handleBooking('pending', property._id, property.ownerId)
                                          }}>
                                             <Row className="mb-3">
                                                <Form.Group as={Col} md="6">
                                                   <Form.Label style={{ color: '#333' }}>Full Name</Form.Label>
                                                   <InputGroup hasValidation>
                                                      <Form.Control
                                                         type="text"
                                                         placeholder="Full Name"
                                                         aria-describedby="inputGroupPrepend"
                                                         required
                                                         name='fullName'
                                                         value={userDetails.fullName}
                                                         onChange={handleChange}
                                                         style={{ backgroundColor: '#ffffff', color: '#333', border: '1px solid #ddd' }}
                                                      />
                                                   </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} md="6">
                                                   <Form.Label style={{ color: '#333' }}>Phone Number</Form.Label>
                                                   <InputGroup hasValidation>
                                                      <Form.Control
                                                         type="number"
                                                         placeholder="Phone Number"
                                                         aria-describedby="inputGroupPrepend"
                                                         required
                                                         name='phone'
                                                         value={userDetails.phone}
                                                         onChange={handleChange}
                                                         style={{ backgroundColor: '#ffffff', color: '#333', border: '1px solid #ddd' }}
                                                      />
                                                   </InputGroup>
                                                </Form.Group>
                                             </Row>
                                             <Button 
                                                type='submit' 
                                                variant="secondary" 
                                                style={{ backgroundColor: '#00bfff', color: 'white', borderRadius: '5px', padding: '8px 20px', fontSize: '16px', fontWeight: 'bold' }}>
                                                Book Property
                                             </Button>
                                          </Form>
                                       </div>
                                    </Modal.Body>
                                 </Modal>
                              </>
                           ) : <p style={{ color: '#333' }}>Property Not Available</p>
                        }
                     </div>
                  )
               }
            </Card.Body>
         </Card>
      ))
   ) : (
      <p>No properties available.</p>
   )}
</div>


      </>
   );
};

export default AllPropertiesCards;