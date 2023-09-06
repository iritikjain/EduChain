import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Link } from 'react-router-dom';
import NGOApproval from '../NGOApproval/NGOApproval.Component';

const NGOList = () => {
  const [approvedNGO, setApprovedNGO] = useState([]);
  const [nonApprovedNGO, setNonApprovedNGO] = useState([]);
  const [approve, setApprove] = useState(null);

  const deleteNGO = async (e, ngoDetails) => {
    e.preventDefault();
    await fetch('http://127.0.0.1:5000/admin/delete-ngo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(localStorage.getItem('token')),
      },
      body: JSON.stringify({
        ngoEmail: ngoDetails.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // handle successful response
        if (!data.status) {
          throw new Error(data.message);
        }
        // console.log(data.message);
        const ngoRemaining = approvedNGO.filter(
          (ngo) => ngo.email !== ngoDetails.email
        );
        setApprovedNGO(ngoRemaining);
      })
      .catch((error) => {
        // handle error response
        console.log(error);
      });
  };

  useEffect(() => {
    const getData = async () => {
      await fetch('http://127.0.0.1:5000/admin/approved-ngos', {
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
          //   console.log(data)
          setApprovedNGO(data.ngoList);
        })
        .catch((error) => {
          // handle error response
          console.log(error);
        });
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await fetch('http://127.0.0.1:5000/admin/pending-ngos', {
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
          //   console.log(data)
          setNonApprovedNGO(data.ngoList);
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
      {approve ? (
        <NGOApproval
          ngoDetails={approve}
          setApprove={setApprove}
          approvedNGO={approvedNGO}
          setApprovedNGO={setApprovedNGO}
          nonApprovedNGO={nonApprovedNGO}
          setNonApprovedNGO={setNonApprovedNGO}
        />
      ) : (
        <div>
          <h1 className='text-2xl font-bold my-1 mt-3 mr-4'>Approve NGOs</h1>
          <TableContainer className='mt-8 border-2' sx={{ maxWidth: 1000 }}>
            <Table>
              <TableHead className='bg-gray-300'>
                <TableRow>
                  <TableCell align='center'>Sr. No.</TableCell>
                  <TableCell align='center'>NGO Name</TableCell>
                  <TableCell align='center'>Email ID</TableCell>
                  <TableCell align='center'>Approve NGO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nonApprovedNGO.map((ngo, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align='center'>{index + 1}</TableCell>
                      <TableCell align='center'>{ngo.name}</TableCell>
                      <TableCell align='center'>{ngo.email}</TableCell>
                      <TableCell align='center'>
                        <button
                          className='rounded text-green-600 py-2 px-6 border-2 border-green-600 hover:bg-green-600 hover:text-white'
                          onClick={() => setApprove(ngo)}
                        >
                          <AddTaskIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <h1 className='text-2xl font-bold my-1 mt-6 mr-4'>Approved NGOs</h1>
          <TableContainer className='mt-8 border-2' sx={{ maxWidth: 1000 }}>
            <Table>
              <TableHead className='bg-gray-300'>
                <TableRow>
                  <TableCell align='center'>Sr. No.</TableCell>
                  <TableCell align='center'>NGO Name</TableCell>
                  <TableCell align='center'>Email ID</TableCell>
                  <TableCell align='center'>Remove NGO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvedNGO.map((ngo, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align='center'>{index + 1}</TableCell>
                      <TableCell align='center'>{ngo.name}</TableCell>
                      <TableCell align='center'>{ngo.email}</TableCell>
                      <TableCell align='center'>
                        {' '}
                        <button
                          className='rounded text-red-600 py-2 px-6 border-2 border-red-600 hover:bg-red-600 hover:text-white'
                          onClick={(e) => deleteNGO(e, ngo)}
                        >
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
      )}
    </>
  );
};

export default NGOList;
