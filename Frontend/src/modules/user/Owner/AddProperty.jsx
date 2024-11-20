import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

function AddProperty() {
   const [image, setImage] = useState(null);
   const [propertyDetails, setPropertyDetails] = useState({
      propertyType: 'residential',
      propertyAdType: 'rent',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });

   const handleImageChange = (e) => {
      const files = e.target.files;
      setImage(files);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   useEffect(() => {
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         propertyImages: image,
      }));
   }, [image]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('propertyType', propertyDetails.propertyType);
      formData.append('propertyAdType', propertyDetails.propertyAdType);
      formData.append('propertyAddress', propertyDetails.propertyAddress);
      formData.append('ownerContact', propertyDetails.ownerContact);
      formData.append('propertyAmt', propertyDetails.propertyAmt);
      formData.append('additionalInfo', propertyDetails.additionalInfo);

      if (image) {
         for (let i = 0; i < image.length; i++) {
            formData.append('propertyImages', image[i]);
         }
      }

      axios.post('http://localhost:8001/api/owner/postproperty', formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
         }
      })
         .then((res) => {
            if (res.data.success) {
               message.success(res.data.message);
            } else {
               message.error(res.data.message);
            }
         })
         .catch((error) => {
            console.error('Error adding property:', error);
         });
   };

   return (
      <Container style={{
         border: '2px solid #2C3E50', borderRadius: '10px', padding: '40px', backgroundColor: '#ECF0F1', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', marginTop: '40px', fontFamily: 'Arial, sans-serif'
      }}>
         <h2 style={{
            textAlign: 'center', color: '#27AE60', fontWeight: 'bold', marginBottom: '30px', textTransform: 'uppercase', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)'
         }}>Add Property</h2>
         <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
               <Form.Group as={Col} md="4">
                  <Form.Label style={{
                     fontWeight: '600', color: '#34495E', fontSize: '18px', marginBottom: '10px'
                  }}>Property Type</Form.Label>
                  <Form.Select name='propertyType' value={propertyDetails.propertyType} onChange={handleChange} style={{
                     borderRadius: '5px', borderColor: '#27AE60', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontSize: '16px', padding: '12px', backgroundColor: '#ffffff'
                  }}>
                     <option value="choose.." disabled>Choose...</option>
                     <option value="residential">Residential</option>
                     <option value="commercial">Commercial</option>
                     <option value="land/plot">Land/Plot</option>
                  </Form.Select>
               </Form.Group>

               <Form.Group as={Col} md="4">
                  <Form.Label style={{
                     fontWeight: '600', color: '#34495E', fontSize: '18px', marginBottom: '10px'
                  }}>Property Ad Type</Form.Label>
                  <Form.Select name='propertyAdType' value={propertyDetails.propertyAdType} onChange={handleChange} style={{
                     borderRadius: '5px', borderColor: '#27AE60', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontSize: '16px', padding: '12px', backgroundColor: '#ffffff'
                  }}>
                     <option value="choose.." disabled>Choose...</option>
                     <option value="rent">Rent</option>
                     <option value="sale">Sale</option>
                  </Form.Select>
               </Form.Group>

               <Form.Group as={Col} md="4">
                  <Form.Label style={{
                     fontWeight: '600', color: '#34495E', fontSize: '18px', marginBottom: '10px'
                  }}>Property Address</Form.Label>
                  <InputGroup hasValidation>
                     <Form.Control
                        type="text"
                        placeholder="Full address of the property"
                        aria-describedby="inputGroupPrepend"
                        required
                        name='propertyAddress'
                        value={propertyDetails.propertyAddress}
                        onChange={handleChange}
                        style={{
                           borderRadius: '5px', borderColor: '#27AE60', fontSize: '16px', padding: '12px', backgroundColor: '#ffffff'
                        }}
                     />
                  </InputGroup>
               </Form.Group>
            </Row>

            <Row className="mb-4">
               <Form.Group as={Col} md="6">
                  <Form.Label style={{
                     fontWeight: '600', color: '#34495E', fontSize: '18px', marginBottom: '10px'
                  }}>Property Images</Form.Label>
                  <Form.Control
                     type="file"
                     placeholder="Upload images"
                     required
                     accept="image/*"
                     name="images"
                     multiple
                     onChange={handleImageChange}
                     style={{
                        borderRadius: '5px', borderColor: '#27AE60', fontSize: '16px', padding: '12px', backgroundColor: '#ffffff'
                     }}
                  />
               </Form.Group>

               <Form.Group as={Col} md="3">
                  <Form.Label style={{
                     fontWeight: '600', color: '#34495E', fontSize: '18px', marginBottom: '10px'
                  }}>Owner Contact No.</Form.Label>
                  <Form.Control
                     type="phone"
                     placeholder="Contact number"
                     required
                     name='ownerContact'
                     value={propertyDetails.ownerContact}
                     onChange={handleChange}
                     style={{
                        borderRadius: '5px', borderColor: '#27AE60', fontSize: '16px', padding: '12px', backgroundColor: '#ffffff'
                     }}
                  />
               </Form.Group>

               <Form.Group as={Col} md="3">
                  <Form.Label style={{
                     fontWeight: '600', color: '#34495E', fontSize: '18px', marginBottom: '10px'
                  }}>Property Amount</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Amount"
                     required
                     name='propertyAmt'
                     value={propertyDetails.propertyAmt}
                     onChange={handleChange}
                     style={{
                        borderRadius: '5px', borderColor: '#27AE60', fontSize: '16px', padding: '12px', backgroundColor: '#ffffff'
                     }}
                  />
               </Form.Group>
            </Row>

            <FloatingLabel
               label="Additional details for the Property"
               className="mb-4"
               style={{
                  fontWeight: '600', color: '#34495E', fontSize: '18px'
               }}
            >
               <Form.Control
                  name='additionalInfo'
                  value={propertyDetails.additionalInfo}
                  onChange={handleChange}
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{
                     borderRadius: '5px', borderColor: '#27AE60', fontSize: '16px', padding: '12px', minHeight: '100px', backgroundColor: '#ffffff'
                  }}
               />
            </FloatingLabel>

            <Button
               variant='outline-success'
               className='float-right'
               type="submit"
               style={{
                  backgroundColor: '#27AE60', color: 'white', borderRadius: '25px', padding: '10px 30px', fontSize: '16px', borderColor: '#27AE60', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', fontWeight: 'bold'
               }}
            >
               Submit Form
            </Button>
         </Form>
      </Container>
   );
}

export default AddProperty;
