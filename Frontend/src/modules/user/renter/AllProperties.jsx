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
      const response = await axios.get(`http://localhost:8001/api/user/getallbookings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
    <div style={{ fontFamily: "'Poppins', sans-serif", padding: '20px', backgroundColor: '#f4f6f9' }}>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#2C3E50',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px #34495E',
        }}
      >
        All Properties and Bookings
      </h2>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: '#34495E',
              }}
            >
              <TableCell
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Booking ID
              </TableCell>
              <TableCell
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
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
                  textTransform: 'uppercase',
                }}
              >
                Tenant Name
              </TableCell>
              <TableCell
                align="center"
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textTransform: 'uppercase',
                }}
              >
                Phone
              </TableCell>
              <TableCell
                align="center"
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textTransform: 'uppercase',
                }}
              >
                Booking Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProperties.map((booking, index) => (
              <TableRow
                key={booking._id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FDEDEC')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff')
                }
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    color: '#34495E',
                  }}
                >
                  {booking._id}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    color: '#34495E',
                  }}
                >
                  {booking.propertyId}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: '500',
                    color: '#34495E',
                  }}
                >
                  {booking.userName}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: '500',
                    color: '#34495E',
                  }}
                >
                  {booking.phone}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: '500',
                    color:
                      booking.bookingStatus.toLowerCase() === 'confirmed'
                        ? '#27AE60'
                        : booking.bookingStatus.toLowerCase() === 'pending'
                        ? '#F39C12'
                        : '#E74C3C',
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

export default AllProperty;
