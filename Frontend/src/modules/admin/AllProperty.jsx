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

const AllProperty = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   return (
      <div
         style={{
            backgroundColor: '#f7f9fc',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
         }}
      >
         <h2
            style={{
               textAlign: 'center',
               color: '#2e7d32',
               fontFamily: "'Poppins', sans-serif",
               fontWeight: 'bold',
               textTransform: 'uppercase',
               letterSpacing: '1px',
               marginBottom: '20px',
            }}
         >
            All Properties
         </h2>
         <TableContainer
            component={Paper}
            style={{
               boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
               borderRadius: '10px',
               overflow: 'hidden',
            }}
         >
            <Table
               sx={{ minWidth: 650 }}
               aria-label="simple table"
               style={{
                  backgroundColor: '#ffffff',
                  fontFamily: "'Poppins', sans-serif",
                  color: '#333333',
               }}
            >
               <TableHead
                  style={{
                     backgroundColor: '#2e7d32',
                  }}
               >
                  <TableRow>
                     <TableCell
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Property ID
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Owner ID
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Property Type
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Property Ad Type
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Property Address
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Owner Contact
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Property Amt
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allProperties.map((property) => (
                     <TableRow
                        key={property._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{
                           backgroundColor: '#f9f9f9',
                           transition: 'background-color 0.3s',
                        }}
                        onMouseOver={(e) =>
                           (e.currentTarget.style.backgroundColor = '#e8f5e9')
                        }
                        onMouseOut={(e) =>
                           (e.currentTarget.style.backgroundColor = '#f9f9f9')
                        }
                     >
                        <TableCell
                           component="th"
                           scope="row"
                           style={{
                              fontSize: '14px',
                              fontWeight: 'bold',
                              color: '#555555',
                           }}
                        >
                           {property._id}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {property.ownerId}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {property.propertyType}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {property.propertyAdType}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {property.propertyAddress}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {property.ownerContact}
                        </TableCell>
                        <TableCell
                           align="center"
                           style={{
                              fontSize: '14px',
                              color: '#2e7d32',
                              fontWeight: 'bold',
                           }}
                        >
                           ₹{property.propertyAmt}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default AllProperty;
