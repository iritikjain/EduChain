import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch('http://127.0.0.1:5000/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: String(localStorage.getItem('token')),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // handle successful response
          if (!data.status) {
            throw new Error(data.message);
          }
          console.log(data);
          setUsers(data.users);
        })
        .catch((error) => {
          // handle error response
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <>
      <h1 className='text-2xl font-bold my-1 mr-4'>Registered Users</h1>
      <TableContainer className='mt-8 border-2' sx={{ maxWidth: 1000 }}>
        <Table>
          <TableHead className='bg-gray-300'>
            <TableRow>
              <TableCell align='center'>Sr. No.</TableCell>
              <TableCell align='center'>Email ID</TableCell>
              <TableCell align='center'>Full Name</TableCell>
              <TableCell align='center'>Remove User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              return (
                <TableRow>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>{user.email}</TableCell>
                  <TableCell align='center'>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell align='center'>
                    {' '}
                    <button className='rounded text-red-600 py-2 px-6 border-2 border-red-600 hover:bg-red-600 hover:text-white'>
                      <DeleteIcon />
                    </button>{' '}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
