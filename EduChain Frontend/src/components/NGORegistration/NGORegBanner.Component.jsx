import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CampaignIcon from '@mui/icons-material/Campaign';

const theme = createTheme();

export default function NGOReg() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box 
          sx={{
            bgcolor: 'background.paper',
            pt: 4,
            pb: 4,
            borderRadius: '20px'
          }}
        >
          <Container maxWidth="lg" className='text-center'>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              fontWeight={'400'}
            >
            <h2 className='text-3xl font-bold text-gray-800 sm:ml-3 ml-0 mb-6'>
                Calling Out All The NGOs To Join Us Today <CampaignIcon fontSize="large" />
            </h2>
            </Typography>
            <Link to='/ngoregistration'>
            <button className="rounded text-black p-2 border-2 border-orange-400 hover:bg-orange-400 hover:text-white">Register Now</button>
            </Link>
          </Container>
        </Box>
    </ThemeProvider>
  );
}