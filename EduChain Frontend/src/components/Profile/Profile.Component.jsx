import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { login, logout } from '../../utils/utils.js';
import { Slide, toast } from 'react-toastify';
import { useEffect } from 'react';

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  function RemoveToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.history.pushState(null, null, 'http://localhost:3000/login');
    window.dispatchEvent(new Event('popstate'));
    toast.success('Successfully Signed Out !', {
      position: 'top-center',
      autoClose: 2000,
      transition: Slide,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    let data = userDetails;
    data['nearWallet'] = JSON.parse(
      window.localStorage.getItem('undefined_wallet_auth_key')
    ).accountId;
    await fetch('http://127.0.0.1:5000/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(localStorage.getItem('token')),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // handle successful response
        if (!data.status) {
          throw new Error(data.message);
        }
        toast.success('Profile Saved Successfully !', {
          position: 'top-center',
          autoClose: 2000,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        // handle error response
        toast.error(error, {
          position: 'top-center',
          autoClose: 2000,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  useEffect(() => {
    if (localStorage.getItem('userType') === 'user') {
      const getData = async () => {
        await fetch('http://127.0.0.1:5000/user/profile', {
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
            console.log(data.user);
            setUserDetails(data.user);
          })
          .catch((error) => {
            // handle error response
          });
      };
      getData();
    } else if (localStorage.getItem('userType') === 'ngoAdmin') {
      const getData = async () => {
        await fetch('http://127.0.0.1:5000/ngo', {
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
            console.log(data.ngo);
            setUserDetails(data.ngo);
          })
          .catch((error) => {
            // handle error response
          });
      };
      getData();
    }
  }, []);

  return (
    <>
      <div>
        <div className='flex gap-2 mt-3'>
          <h1 className='text-2xl font-bold my-1 mr-4'>Profile</h1>
          {editable ? (
            <button
              className='rounded bg-orange-400 text-white p-2 hover:text-orange-400 hover:bg-white hover:border-2 hover:border-orange-400'
              onClick={(e) => {
                setEditable(false);
                handleSaveProfile(e);
              }}
            >
              Save Profile
            </button>
          ) : (
            <button
              className='rounded bg-orange-400 text-white p-2 hover:text-orange-400 hover:bg-white hover:border-2 hover:border-orange-400'
              onClick={() => setEditable(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
        <TableContainer className='mt-8 mb-8 border-2' sx={{ maxWidth: 1000 }}>
          <Table>
            <TableHead>
              {localStorage.getItem('userType') === 'user' && (
                <>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter First Name'}
                        color={'warning'}
                        disabled={!editable}
                        value={userDetails.firstName}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter Last Name'}
                        color={'warning'}
                        disabled={!editable}
                        value={userDetails.lastName}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email Id</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter Email Id'}
                        color={'warning'}
                        disabled={true}
                        value={userDetails.email}
                      />
                    </TableCell>
                    <TableCell>Area Of Interest</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter Area Of Interest'}
                        color={'warning'}
                        disabled={!editable}
                        value={userDetails.areaOfInterests}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            areaOfInterests: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Organization Name</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter Organization Name'}
                        color={'warning'}
                        disabled={!editable}
                        value={userDetails.organization}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            organization: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    {userDetails.ngo ? (
                      <>
                        <TableCell>NGO Name</TableCell>
                        <TableCell>
                          <TextField
                            placeholder={'Enter NGO / NPO Name'}
                            color={'warning'}
                            disabled={true}
                            value={userDetails.ngo}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>NGO Name</TableCell>
                        <TableCell>
                          <TextField
                            placeholder={'Enter NGO / NPO Name'}
                            color={'warning'}
                            disabled={true}
                            value={'NA'}
                          />
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </>
              )}

              {localStorage.getItem('userType') === 'ngoAdmin' && (
                <>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter Name'}
                        color={'warning'}
                        disabled={true}
                        value={userDetails.name}
                      />
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter Email'}
                        color={'warning'}
                        disabled={true}
                        value={userDetails.email}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter Phone'}
                        color={'warning'}
                        disabled={true}
                        value={userDetails.phone}
                      />
                    </TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>
                      <TextField
                        placeholder={'Enter Location'}
                        color={'warning'}
                        disabled={true}
                        value={userDetails.location}
                      />
                    </TableCell>
                  </TableRow>
                </>
              )}

              <TableRow>
                <TableCell>NEAR ID</TableCell>
                <TableCell>
                  {window.localStorage.getItem('undefined_wallet_auth_key') ? (
                    JSON.parse(
                      window.localStorage.getItem('undefined_wallet_auth_key')
                    ).accountId
                  ) : (
                    <>
                      <Link to='/profile'>
                        <button
                          onClick={login}
                          className='rounded text-black p-2 mr-3 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'
                        >
                          Link Near ID
                        </button>
                      </Link>
                      <Link
                        to='https://wallet.testnet.near.org/create'
                        target='_blank'
                      >
                        <button className='rounded text-black p-2 mr-4 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'>
                          Create Near ID
                        </button>
                      </Link>
                    </>
                  )}
                </TableCell>
                {window.localStorage.getItem('undefined_wallet_auth_key') && (
                  <>
                    <TableCell>
                      <Link
                        to='https://wallet.testnet.near.org/'
                        target='_blank'
                      >
                        <button className='rounded text-black p-2 mr-4 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'>
                          Open Near Wallet
                        </button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={logout}
                        className='rounded text-black p-2 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'
                      >
                        Unlink Near ID
                      </button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <div className='flex gap-2 mt-3'>
          <button
            className='rounded bg-orange-400 text-white p-2 hover:text-orange-400 hover:bg-white hover:border-2 hover:border-orange-400'
            onClick={RemoveToken}
          >
            Sign Out
          </button>
          <Link to='/changepassword'>
            <button className='rounded text-black p-2 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'>
              Change Password
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
