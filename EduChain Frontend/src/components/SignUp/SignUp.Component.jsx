import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast, Slide } from 'react-toastify';

const theme = createTheme();

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    secretCode: '',
  });

  const [credentials, setCredentials] = useState({
    check: false,
  });

  const [error, setError] = React.useState({
    passwordError: false,
    emailError: false,
    secretCodeError: false,
  });

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  const validateSecretCode = (secretCode) => {
    const regex = /^\s*$/;
    return regex.test(secretCode);
  };

  const inputChanged = () => {
    if (!credentials.check) {
      setCredentials({ ...credentials, check: true });
    } else {
      setCredentials({ ...credentials, check: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { check } = credentials;
    const { email, password, secretCode } = signUpData;
    if (check){
      if (!email || !password || !secretCode) {
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
    } else {
      if (!email || !password) {
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
    }
    if ((signUpData.secretCode !== '') && validateEmail(email) && validatePassword(password) && !validateSecretCode(secretCode)) {
      await fetch('http://127.0.0.1:5000/ngo/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      })
        .then((response) => {
          // handle successful response
          if (!response.ok) {
            throw new Error(response.status);
          }
          window.history.pushState(null, null, 'http://localhost:3000/login');
          window.dispatchEvent(new Event('popstate'));
        })
        .catch((error) => {
          // handle error response
          console.log(error);
        });
    } else if ((signUpData.secretCode === '') && validateEmail(email) && validatePassword(password) && validateSecretCode(secretCode)){
      await fetch('http://127.0.0.1:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      })
        .then((response) => {
          // handle successful response
          if (!response.ok) {
            throw new Error(response.status);
          }
          window.history.pushState(null, null, 'http://localhost:3000/login');
          window.dispatchEvent(new Event('popstate'));
        toast.success("Successfully Signed Up !", {
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
        })
        .catch((error) => {
          // handle error response
        toast.error("Kindly Try Again !", {
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
        });
    }
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
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
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
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  value={signUpData.password}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, password: e.target.value });
                    setError({ ...error, passwordError: !validatePassword(e.target.value)});
                  }}
                  error={error.passwordError}
                  helperText={
                    error.passwordError
                      ? 'Password Must Contain At Least 8 Characters With At Least 1 Uppercase Letter, 1 Lowercase Letter, 1 One Number'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='Do You Belong To An NGO ?'
                  name='check'
                  value={credentials.check}
                  onChange={inputChanged}
                />
              </Grid>
              {credentials.check && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='accessCode'
                    label='Access Code'
                    name='accessCode'
                    autoComplete='family-name'
                    value={signUpData.secretCode}
                    onChange={(e) => {
                      setSignUpData({ ...signUpData, secretCode: e.target.value });
                      setError({ ...error, secretCodeError: validateSecretCode(e.target.value)});
                    }}
                    error={error.secretCodeError}
                    helperText={error.secretCodeError ? 'Access Code Is Required' : ''}
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={(event) => handleSubmit(event)}
            >
              Sign Up
            </Button>
            <Link to='/'>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 1, mb: 2 }}
              >
                Back To Home
              </Button>
            </Link>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  to='/login'
                  variant='body2'
                  className='underline text-blue-600 hover:text-blue-500'
                >
                  {'Already Have An Account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
