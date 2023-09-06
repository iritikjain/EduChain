import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ipfs from '../../utils/ipfs';
import { Slide, toast } from 'react-toastify';
import { MuiFileInput } from 'mui-file-input';

const theme = createTheme();

export default function NGORegistration() {
  const [label, setLabel] = useState('Upload');
  const [imageUpload, setImageUpload] = useState(false);
  const [file, setFile] = React.useState(null);

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    name:'',
    phone:'',
    location:'',
    documentUrl: '',
  });

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const [error, setError] = React.useState({
    passwordError: false,
    emailError: false,
    nameError: false,
    phoneError: false,
    locationError: false,
    documentUrlError: false,
  });

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  const validateName = (name) => {
    const regex = /^\s*$/;
    return regex.test(name);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };
  
  const validateLocation = (location) => {
    const regex = /^\s*$/;
    return regex.test(location);
  };

  const validateDocumentURL = (documentUrl) => {
    const regex = /^\s*$/;
    return regex.test(documentUrl);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.info('Uploading Document ...', {
      position: "top-center",
      autoClose: 1000,
      transition: Slide,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      const response = await ipfs.add(file);
      toast.dismiss(toastId);
      const ImgHash = `https://ipfs.io/ipfs/${response.path}`;
      toast.success('Document Uploaded Successfully !', {
            position: "top-center",
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      setSignUpData({
        ...signUpData,
        documentUrl: ImgHash,
      });
      setImageUpload(true);
    } catch (error) {
      toast.error('Document Upload Failed !', {
            position: "top-center",
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name, phone, location, documentUrl } = signUpData;
    if (!email || !password || !name || !phone || !location || !documentUrl) {
      toast.error('Kindly Fill All The Required Details.', {
        position: "top-center",
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        return
    }
    if (validateEmail(email) && validatePassword(password) && validatePhone(phone) && !validateName(name) && !validateLocation(location) && !validateDocumentURL(documentUrl)) {
    try {
      const response = await fetch('http://127.0.0.1:5000/ngo/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      window.history.pushState(null, null, 'http://localhost:3000/login');
      window.dispatchEvent(new Event('popstate'));
      toast.success('Successfully Signed Up! We Will Verify Your Details & Contact You Soon.', {
        position: "top-center",
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      // handle error response
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }}
  };

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      window.history.pushState(null, null, 'http://localhost:3000/');
      window.dispatchEvent(new Event('popstate'));
      toast.error('You Are Already Signed In! Sign Out To Register.', {
        position: 'top-center',
        autoClose: 4000,
        transition: Slide,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            NGO Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="NGO Name"
                  id="ngoname"
                  autoComplete="ngoname"
                  autoFocus
                  value={signUpData.name}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, name: e.target.value });
                    setError({ ...error, nameError: validateName(e.target.value)});
                  }}
                  error={error.nameError}
                  helperText={error.nameError ? 'Name Is Required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type='email'
                  value={signUpData.email}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, email: e.target.value });
                    setError({ ...error, emailError: !validateEmail(e.target.value)});
                  }}
                  error={error.emailError}
                  helperText={error.emailError ? 'Invalid Email Format | Eg. educhain@educhain.com' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phoneNumber"
                  type='number'
                  value={signUpData.phone}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, phone: e.target.value });
                    setError({ ...error, phoneError: !validatePhone(e.target.value)});
                  }}
                  error={error.phoneError}
                  helperText={error.phoneError ? 'Invalid Phone Format | Eg. 9087654321' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  id="location"
                  autoComplete="location"
                  value={signUpData.location}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, location: e.target.value });
                    setError({ ...error, locationError: validateLocation(e.target.value)});
                  }}
                  error={error.locationError}
                  helperText={error.locationError ? 'Location Is Required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={signUpData.password}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, password: e.target.value });
                    setError({ ...error, passwordError: !validatePassword(e.target.value)});
                  }}
                  error={error.passwordError}
                  helperText={error.passwordError ? 'Password Must Contain At Least 8 Characters With At Least 1 Uppercase Letter, 1 Lowercase Letter, 1 One Number' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
              <MuiFileInput
              value={file}
              placeholder='Upload Govt. ID Card'
              onChange={handleChange}
              disabled={imageUpload}
              />
              </Grid>
              <Grid item xs={12} sm={4} className='text-center'>
              <button
              className='px-4 py-2 mt-2 border border-2 rounded border-blue-400 hover:bg-gray-200'
              onClick={(e) => handleUpload(e)}>
              {label}
              </button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(event) => handleSubmit(event)}
            >
              Sign Up
            </Button>
            <Link to='/'>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Back To Home
            </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}