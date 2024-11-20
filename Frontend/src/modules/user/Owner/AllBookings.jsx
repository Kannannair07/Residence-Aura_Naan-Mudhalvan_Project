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
import { Button } from 'react-bootstrap';

const AllProperty = () => {
   const [allBookings, setAllBookings] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallbookings', {
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
      getAllProperty();
   }, []);

   const handleStatus = async (bookingId, propertyId, status) => {
      try {
         const res = await axios.post('http://localhost:8001/api/owner/handlebookingstatus', { bookingId, propertyId, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         })
         if (res.data.success) {
            message.success(res.data.message)
            getAllProperty()
         }
         else {
            message.error('Something went wrong')
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div style={{ padding: '30px', backgroundColor: '#f4f6f9', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
         <h2 style={{
            textAlign: 'center', color: '#2980B9', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
         }}>All Property Bookings</h2>

         <TableContainer component={Paper} style={{ borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead style={{
                  backgroundColor: '#2980B9', color: 'white', fontWeight: '600', fontSize: '18px', textAlign: 'center'
               }}>
                  <TableRow>
                     <TableCell style={{ color: '#fff' }}>Booking ID</TableCell>
                     <TableCell align="center" style={{ color: '#fff' }}>Property ID</TableCell>
                     <TableCell align="center" style={{ color: '#fff' }}>Tenant Name</TableCell>
                     <TableCell align="center" style={{ color: '#fff' }}>Tenant Phone</TableCell>
                     <TableCell align="center" style={{ color: '#fff' }}>Booking Status</TableCell>
                     <TableCell align="center" style={{ color: '#fff' }}>Actions</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allBookings.map((booking) => (
                     <TableRow
                        key={booking._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{
                           backgroundColor: booking.bookingStatus === 'pending' ? '#FDEBD0' : '#D5F5E3', 
                           borderRadius: '5px',
                           transition: 'background-color 0.3s ease-in-out'
                        }}
                     >
                        <TableCell component="th" scope="row" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'center' }}>
                           {booking._id}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{booking.propertyId}</TableCell>
                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{booking.userName}</TableCell>
                        <TableCell align="center" style={{ fontSize: '16px', fontWeight: '500' }}>{booking.phone}</TableCell>
                        <TableCell align="center" style={{
                           fontSize: '16px', fontWeight: '500', color: booking.bookingStatus === 'pending' ? '#E67E22' : '#27AE60'
                        }}>
                           {booking.bookingStatus}
                        </TableCell>
                        <TableCell align="center">
                           {
                              booking?.bookingStatus === "pending" ? (
                                 <Button onClick={() => handleStatus(booking._id, booking.propertyId, 'booked')} variant='outline-success' style={{
                                    borderRadius: '25px', padding: '8px 20px', fontSize: '14px', backgroundColor: '#27AE60', color: 'white', fontWeight: '600', borderColor: '#27AE60', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease'
                                 }}>
                                    Change to Booked
                                 </Button>
                              ) : (
                                 <Button onClick={() => handleStatus(booking._id, booking.propertyId, 'pending')} variant='outline-danger' style={{
                                    borderRadius: '25px', padding: '8px 20px', fontSize: '14px', backgroundColor: '#E74C3C', color: 'white', fontWeight: '600', borderColor: '#E74C3C', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease'
                                 }}>
                                    Change to Pending
                                 </Button>
                              )
                           }
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
