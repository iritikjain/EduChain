import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';

const NGOApproval = ({
  ngoDetails,
  setApprove,
  setApprovedNGO,
  approvedNGO,
  nonApprovedNGO,
  setNonApprovedNGO,
}) => {
  const approveNGO = async (e) => {
    e.preventDefault();
    await fetch('http://127.0.0.1:5000/admin/change-status', {
      method: 'POST',
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
        const ngoRemaining = nonApprovedNGO.filter((ngo) => ngo.email!==ngoDetails.email);
        console.log(ngoRemaining);
        setApprove(null);
        setNonApprovedNGO(ngoRemaining);
        setApprovedNGO([...approvedNGO, ngoDetails]);
      })
      .catch((error) => {
        // handle error response
        console.log(error);
      });
  };

  const rejectNGO = async (e) => {
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
        const ngoRemaining = nonApprovedNGO.filter((ngo) => ngo.email!==ngoDetails.email);
        console.log(ngoRemaining);
        setApprove(null);
        setNonApprovedNGO(ngoRemaining);
      })
      .catch((error) => {
        // handle error response
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold my-1 mt-3 mr-4'>
          Approve This NGO ?
        </h1>
        <TableContainer className='mt-8 border-2' sx={{ maxWidth: 1000 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align='center' className='bg-gray-300 w-1/3'>
                  NGO Name
                </TableCell>
                <TableCell align='center'>{ngoDetails.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' className='bg-gray-300'>
                  Email Address
                </TableCell>
                <TableCell align='center'>{ngoDetails.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' className='bg-gray-300'>
                  Phone Number
                </TableCell>
                <TableCell align='center'>+91 {ngoDetails.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' className='bg-gray-300'>
                  Location
                </TableCell>
                <TableCell align='center'>{ngoDetails.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' className='bg-gray-300'>
                  Uploaded ID Proof
                </TableCell>
                <TableCell align='center'>
                  <Link to={ngoDetails.documentUrl} target='_blank'>
                    <VisibilityIcon className='mr-2' />
                    View
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow align='center'>
                <TableCell align='center' className='bg-gray-300'>
                  Want To Approve This NGO ?
                </TableCell>
                <TableCell align='center'>
                  <button
                    className='rounded text-green-600 py-2 px-6 mr-4 border-2 border-green-600 hover:bg-green-600 hover:text-white'
                    onClick={(e) => approveNGO(e)}
                  >
                    <AddTaskIcon />
                  </button>
                  <button className='rounded text-red-600 py-2 px-6 border-2 border-red-600 hover:bg-red-600 hover:text-white'
                  onClick={(e) => rejectNGO(e)}>
                    <CancelIcon />
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default NGOApproval;
