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
import Button from '@mui/material/Button';

const AllUsers = () => {
   const [allUser, setAllUser] = useState([]);

   useEffect(() => {
      getAllUser();
   }, []);

   const getAllUser = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallusers', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllUser(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleStatus = async (userid, status) => {
      try {
         await axios.post('http://localhost:8001/api/admin/handlestatus', { userid, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         }).then((res) => {
            if (res.data.success) {
               getAllUser();
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
         <h2
            style={{
               textAlign: 'center',
               fontFamily: "'Poppins', sans-serif",
               color: '#3f51b5',
               marginBottom: '20px',
               fontWeight: 'bold',
               textTransform: 'uppercase',
               letterSpacing: '1px',
            }}
         >
            All Users
         </h2>
         <TableContainer
            component={Paper}
            style={{
               boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
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
                     backgroundColor: '#3f51b5',
                     color: '#ffffff',
                  }}
               >
                  <TableRow>
                     <TableCell style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>User ID</TableCell>
                     <TableCell align="center" style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>
                        Name
                     </TableCell>
                     <TableCell align="center" style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>
                        Email
                     </TableCell>
                     <TableCell align="center" style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>
                        Type
                     </TableCell>
                     <TableCell align="center" style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>
                        Granted (for Owners users only)
                     </TableCell>
                     <TableCell align="center" style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>
                        Actions
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allUser.map((user) => (
                     <TableRow
                        key={user._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{
                           backgroundColor: '#f9f9f9',
                           transition: 'background-color 0.3s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e8f4fd')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                     >
                        <TableCell component="th" scope="row" style={{ fontSize: '14px' }}>
                           {user._id}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {user.name}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {user.email}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {user.type}
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '14px' }}>
                           {user.granted}
                        </TableCell>
                        <TableCell align="center">
                           {user.type === 'Owner' && user.granted === 'ungranted' ? (
                              <Button
                                 onClick={() => handleStatus(user._id, 'granted')}
                                 size="small"
                                 variant="contained"
                                 style={{
                                    backgroundColor: '#4caf50',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    padding: '5px 15px',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                 }}
                              >
                                 Grant Access
                              </Button>
                           ) : user.type === 'Owner' && user.granted === 'granted' ? (
                              <Button
                                 onClick={() => handleStatus(user._id, 'ungranted')}
                                 size="small"
                                 variant="outlined"
                                 style={{
                                    color: '#f44336',
                                    border: '2px solid #f44336',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    padding: '5px 15px',
                                    textTransform: 'none',
                                    transition: 'all 0.3s',
                                 }}
                              >
                                 Revoke Access
                              </Button>
                           ) : null}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default AllUsers;
