import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

const Students = () => {
  const [code, setCode] = useState('');
  const [students, setStudents] = useState([]);

  const generateCode = async (e) => {
    e.preventDefault();
    await fetch('http://127.0.0.1:5000/ngo/generate-token', {
      method: 'POST',
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
        setCode(data.code);
      })
      .catch((error) => {
        // handle error response
        console.log(error);
      });
  };

  useEffect(() => {
    const getData = async () => {
      await fetch('http://127.0.0.1:5000/ngo/users', {
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
          if (data.ngoUsers.secretCode) {
            setCode(data.ngoUsers.secretCode);
          }
          setStudents(data.ngoUsers.ngoUsersId);
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
      <div>
        <div className='flex gap-2 mt-3'>
          <h1 className='text-2xl font-bold my-1 mr-4'>NGO Students</h1>
          { !code ?
          <button
            className='rounded bg-orange-400 text-white p-2 hover:text-orange-400 hover:bg-white hover:border-2 hover:border-orange-400' onClick={(e) => generateCode(e)}>
              Generate NGO Access Code
          </button> : 
          <button
            className='rounded bg-orange-400 text-white p-2 hover:text-orange-400 hover:bg-white hover:border-2 hover:border-orange-400'>
              Your NGO Access Code
          </button>
          }
          <input
            placeholder={'Access Code'}
            color={'warning'}
            disabled={true}
            hidden={!code}
            value={code}
            className='py-2 p-4 rounded text-black border-2 border-orange-400 hover:bg-orange-400 hover:text-white'
          />
        </div>
        <TableContainer className='mt-8 border-2' sx={{ maxWidth: 1000 }}>
          <Table>
            <TableHead className='bg-gray-300'>
              <TableRow>
                <TableCell align='center'>Sr. No.</TableCell>
                {/* <TableCell align='center'>Username</TableCell> */}
                <TableCell align='center'>Email ID</TableCell>
                <TableCell align='center'>Full Name</TableCell>
                <TableCell align='center'>Remove Student</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => {
                return (
                  <TableRow>
                    <TableCell align='center'>{index+1}</TableCell>
                    {/* <TableCell align='center'>@username</TableCell> */}
                    <TableCell align='center'>{student.email}</TableCell>
                    <TableCell align='center'>{student.firstName} {student.lastName}</TableCell>
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
      </div>
    </>
  );
};

export default Students;
