import * as React from 'react';
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
import { Slide, toast } from 'react-toastify';

const theme = createTheme();

export default function SignIn() {
  const [signInData, setSignInData] = React.useState({
    password: '',
    email: '',
  });

  const [error, setError] = React.useState({
    passwordError: false,
    emailError: false,
  });

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const regex = /^\s*$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = signInData;
    if (!email || !password ) {
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
    if (validateEmail(email) && !validatePassword(password)){
    await fetch('http://127.0.0.1:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => {
        // handle successful response
        if (!response.ok) { 
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', data.userType);
        window.history.pushState(null, null, 'http://localhost:3000/');
        window.dispatchEvent(new Event('popstate'));
        toast.success('Successfully Signed In !', {
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
        toast.error("Invalid Credentials! Kindly Try Again.", {
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
      toast.error('You Are Already Signed In', {
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
            Sign In
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={signInData.email}
              onChange={(e) => {
                setSignInData({ ...signInData, email: e.target.value });
                setError({ ...error, emailError: !validateEmail(e.target.value)});
              }}
              error={error.emailError}
              helperText={error.emailError ? 'Invalid Email Format' : ''}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={signInData.password}
              onChange={(e) => {
                setSignInData({ ...signInData, password: e.target.value });
                setError({ ...error, passwordError: validatePassword(e.target.value)});
              }}
              error={error.passwordError}
              helperText={
                error.passwordError
                  ? 'Password Is Required'
                  : ''
              }
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
            <Grid container>
              <Grid item xs>
                <Link
                  to='/forgotpassword'
                  variant='body2'
                  className='underline text-blue-600 hover:text-blue-500'
                >
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to='/register'
                  variant='body2'
                  className='underline text-blue-600 hover:text-blue-500'
                >
                  {"Don't Have An Account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container className='mt-2'>
              <Grid item xs>
            
              </Grid>
              <Grid item>
                <Link
                  to='/ngoregistration'
                  variant='body2'
                  className='underline text-blue-600 hover:text-blue-500'
                >
                  {"Want To Register As NGO?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
