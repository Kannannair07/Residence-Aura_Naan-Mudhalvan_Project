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

const AllBookings = () => {
   const [allBookings, setAllBookings] = useState([]);

   const getAllBooking = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallbookings', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllBookings(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllBooking();
   }, []);

   return (
      <div
         style={{
            backgroundColor: '#f4f8fc',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
         }}
      >
         <h2
            style={{
               textAlign: 'center',
               color: '#1e88e5',
               fontFamily: "'Roboto', sans-serif",
               fontWeight: 'bold',
               textTransform: 'uppercase',
               letterSpacing: '1.5px',
               marginBottom: '20px',
            }}
         >
            All Bookings
         </h2>
         <TableContainer
            component={Paper}
            style={{
               boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
               borderRadius: '10px',
               overflow: 'hidden',
            }}
         >
            <Table
               sx={{ minWidth: 650 }}
               aria-label="simple table"
               style={{
                  backgroundColor: '#ffffff',
                  fontFamily: "'Roboto', sans-serif",
                  color: '#333333',
               }}
            >
               <TableHead
                  style={{
                     backgroundColor: '#1e88e5',
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
                        Booking ID
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
                        Tenent ID
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Tenent Name
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Tenent Contact
                     </TableCell>
                     <TableCell
                        align="center"
                        style={{
                           color: '#ffffff',
                           fontWeight: 'bold',
                           fontSize: '16px',
                        }}
                     >
                        Booking Status
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allBookings.map((booking) => (
                     <TableRow
                        key={booking._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{
                           backgroundColor: '#f9f9f9',
                           transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) =>
                           (e.currentTarget.style.backgroundColor = '#e3f2fd')
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
                           {booking._id}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {booking.ownerID}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {booking.propertyId}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {booking.userID}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {booking.userName}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {booking.phone}
                        </TableCell>
                        <TableCell
                           align="center"
                           style={{
                              fontSize: '14px',
                              color:
                                 booking.bookingStatus === 'Confirmed'
                                    ? '#43a047'
                                    : '#e53935',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                           }}
                        >
                           {booking.bookingStatus}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default AllBookings;
