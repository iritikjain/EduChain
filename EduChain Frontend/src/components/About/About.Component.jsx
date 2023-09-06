import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function About() {
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
          <Container maxWidth="lg">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              fontWeight={'400'}
            >
            <h2 className='text-3xl font-bold text-gray-800 sm:ml-3 ml-0 mb-6'>
                About Us
            </h2>
            </Typography>
            <Typography align="justify">
                We have many e-learning platforms that provide quality learning resources, but none of them have utilised the capabilities and benefits of decentralised technology, more specifically blockchain. EduChain is an e-learning platform that supports free learning for students of non-profit organisations. The platform provides learners with the option of purchasing specific modules of courses (which saves money and allows them to learn what they want) in addition to the standard option of purchasing the entire course. After completion of a particular course or module, they will get certificates in the form of NFTs, which will help them showcase their skills while searching for jobs. Also, our application provides support for fungible tokens, which students can get as a reward after completing the course, which is not present in most of the other available applications. This FTs will be beneficial to students to avail discounts and coupons.
            </Typography>
          </Container>
        </Box>
    </ThemeProvider>
  );
}