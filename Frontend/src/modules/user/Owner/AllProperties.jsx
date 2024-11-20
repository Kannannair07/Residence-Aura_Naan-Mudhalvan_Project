import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Form, Modal, Col, Row, FloatingLabel } from 'react-bootstrap';

const AllProperties = () => {
   const [image, setImage] = useState(null);
   const [editingPropertyId, setEditingPropertyId] = useState(null);
   const [editingPropertyData, setEditingPropertyData] = useState({
      propertyType: '',
      propertyAdType: '',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });
   const [allProperties, setAllProperties] = useState([]);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);

   const handleShow = (propertyId) => {
      const propertyToEdit = allProperties.find(property => property._id === propertyId);
      if (propertyToEdit) {
         setEditingPropertyId(propertyId);
         setEditingPropertyData(propertyToEdit);
         setShow(true);
      }
   };

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });
         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error('Something went wrong')
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);


   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
   }
   const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingPropertyData({ ...editingPropertyData, [name]: value });
   }

   useEffect(() => {
      setEditingPropertyData((prevDetails) => ({
         ...prevDetails,
         propertyImage: image,
      }));
   }, [image]);

   const saveChanges = async (propertyId, status) => {
      try {
         const formData = new FormData();
         formData.append('propertyType', editingPropertyData.propertyType);
         formData.append('propertyAdType', editingPropertyData.propertyAdType);
         formData.append('propertyAddress', editingPropertyData.propertyAddress);
         formData.append('ownerContact', editingPropertyData.ownerContact);
         formData.append('propertyAmt', editingPropertyData.propertyAmt);
         formData.append('additionalInfo', editingPropertyData.additionalInfo);
         formData.append('propertyImage', image);
         formData.append('isAvailable', status);
         const res = await axios.patch(`http://localhost:8001/api/owner/updateproperty/${propertyId}`, formData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         })
         if (res.data.success) {
            message.success(res.data.message)
            handleClose();
         }
      } catch (error) {
         console.log(error);
         message.error('Failed to save changes');
      }
   };

   const handleDelete = async (propertyId) => {
      let assure = window.confirm("Are you sure you want to delete?");
      if (assure) {
         try {
            const response = await axios.delete(`http://localhost:8001/api/owner/deleteproperty/${propertyId}`, {
               headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });

            if (response.data.success) {
               message.success(response.data.message);
               getAllProperty();
            } else {
               message.error(response.data.message);
            }
         } catch (error) {
            console.log(error);
         }
      }
   }

   return (
      <div style={{ backgroundColor: '#f4f6f9', padding: '20px', minHeight: '100vh' }}>
         <TableContainer component={Paper} style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead style={{ backgroundColor: '#007bff', color: '#fff', fontSize: '1.2rem' }}>
                  <TableRow>
                     <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Property ID</TableCell>
                     <TableCell align="center" style={{ fontWeight: 'bold', color: '#fff' }}>Property Type</TableCell>
                     <TableCell align="center" style={{ fontWeight: 'bold', color: '#fff' }}>Property Ad Type</TableCell>
                     <TableCell align="center" style={{ fontWeight: 'bold', color: '#fff' }}>Property Address</TableCell>
                     <TableCell align="center" style={{ fontWeight: 'bold', color: '#fff' }}>Owner Contact</TableCell>
                     <TableCell align="center" style={{ fontWeight: 'bold', color: '#fff' }}>Property Amt</TableCell>
                     <TableCell align="center" style={{ fontWeight: 'bold', color: '#fff' }}>Property Availability</TableCell>
                     <TableCell align="center" style={{ fontWeight: 'bold', color: '#fff' }}>Action</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allProperties.map((property) => (
                     <TableRow
                        key={property._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{ backgroundColor: '#ffffff', borderRadius: '8px', margin: '10px 0' }}
                     >
                        <TableCell component="th" scope="row">{property._id}</TableCell>
                        <TableCell align="center">{property.propertyType}</TableCell>
                        <TableCell align="center">{property.propertyAdType}</TableCell>
                        <TableCell align="center">{property.propertyAddress}</TableCell>
                        <TableCell align="center">{property.ownerContact}</TableCell>
                        <TableCell align="center">{property.propertyAmt}</TableCell>
                        <TableCell align="center">{property.isAvailable}</TableCell>
                        <TableCell align="center">
                           <Button variant='outline-info' onClick={() => handleShow(property._id)} style={{ margin: '5px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px' }}>
                              Edit
                           </Button>
                           <Button className='mx-2' variant='outline-danger' onClick={() => handleDelete(property._id)} style={{ margin: '5px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '5px' }}>
                              Delete
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>

         {/* Edit Property Modal */}
         <Modal show={show && editingPropertyId !== null} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Edit Property Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form onSubmit={() => saveChanges(editingPropertyId)}>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="4">
                        <Form.Label>Property Type</Form.Label>
                        <Form.Select
                           name='propertyType'
                           value={editingPropertyData.propertyType}
                           onChange={handleChange}
                           defaultValue={'Choose...'}
                        >
                           <option value="choose.." disabled>Choose...</option>
                           <option value="residential">Residential</option>
                           <option value="commercial">Commercial</option>
                           <option value="land/plot">Land/Plot</option>
                        </Form.Select>
                     </Form.Group>
                     <Form.Group as={Col} md="4">
                        <Form.Label>Property Ad Type</Form.Label>
                        <Form.Select
                           name='propertyAdType'
                           value={editingPropertyData.propertyAdType}
                           onChange={handleChange}
                        >
                           <option value="choose.." disabled>Choose...</option>
                           <option value="rent">Rent</option>
                           <option value="sale">Sale</option>
                        </Form.Select>
                     </Form.Group>
                     <Form.Group as={Col} md="4">
                        <Form.Label>Property Full Address</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Address"
                           name='propertyAddress'
                           value={editingPropertyData.propertyAddress}
                           onChange={handleChange}
                           required
                        />
                     </Form.Group>
                  </Row>

                  <Row className="mb-3">
                     <Form.Group as={Col} md="6">
                        <Form.Label>Property Image</Form.Label>
                        <Form.Control
                           type="file"
                           accept="image/*"
                           onChange={handleImageChange}
                           required
                        />
                     </Form.Group>
                     <Form.Group as={Col} md="3">
                        <Form.Label>Owner Contact No.</Form.Label>
                        <Form.Control
                           type="phone"
                           placeholder="Contact Number"
                           name='ownerContact'
                           value={editingPropertyData.ownerContact}
                           onChange={handleChange}
                           required
                        />
                     </Form.Group>
                     <Form.Group as={Col} md="3">
                        <Form.Label>Property Amount</Form.Label>
                        <Form.Control
                           type="number"
                           placeholder="Amount"
                           name='propertyAmt'
                           value={editingPropertyData.propertyAmt}
                           onChange={handleChange}
                           required
                        />
                     </Form.Group>
                  </Row>

                  <FloatingLabel label="Additional Details" className="mt-3">
                     <Form.Control
                        as="textarea"
                        name='additionalInfo'
                        value={editingPropertyData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Leave additional comments here"
                     />
                  </FloatingLabel>

                  <Button
                     type="submit"
                     variant="outline-info"
                     style={{
                        marginTop: '20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '5px',
                        float: 'right'
                     }}
                  >
                     Update Property
                  </Button>
               </Form>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default AllProperties;
