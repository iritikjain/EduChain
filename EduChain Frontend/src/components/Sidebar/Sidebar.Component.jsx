import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label='main mailbox folders'>
        <List>
          {window.localStorage.getItem('userType') !== 'admin' && (
            <Link to='/profile'>
              <ListItem
                disablePadding
                sx={{ border: '1px solid lightgray', marginBottom: '1rem' }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary='Profile' />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
          {/* {
            window.localStorage.getItem('userType') === 'ngoAdmin' && (
              <Link to='/yourcourses'>
              <ListItem
                disablePadding
                sx={{ border: '1px solid lightgray', marginBottom: '1rem' }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PendingIcon />
                  </ListItemIcon>
                  <ListItemText primary='Your Courses' />
                </ListItemButton>
              </ListItem>
            </Link>
            )
          } */}
          {window.localStorage.getItem('userType') === 'user' && (
            <Link to='/inprogresscourses'>
              <ListItem
                disablePadding
                sx={{ border: '1px solid lightgray', marginBottom: '1rem' }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PendingIcon />
                  </ListItemIcon>
                  <ListItemText primary='In-Progress Courses' />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {window.localStorage.getItem('userType') === 'user' && (
            <Link to='/completedcourses'>
              <ListItem
                disablePadding
                sx={{ border: '1px solid lightgray', marginBottom: '1rem' }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentTurnedInIcon />
                  </ListItemIcon>
                  <ListItemText primary='Completed Courses' />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {window.localStorage.getItem('userType') === 'user' && (
            <Link to='/uploadedcourses'>
              <ListItem
                disablePadding
                sx={{ border: '1px solid lightgray', marginBottom: '1rem' }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <DriveFolderUploadIcon />
                  </ListItemIcon>
                  <ListItemText primary='Uploaded Courses' />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {window.localStorage.getItem('userType') === 'ngoAdmin' && (
            <Link to='/students'>
              <ListItem
                disablePadding
                sx={{ border: '1px solid lightgray', marginBottom: '1rem' }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary='NGO Students' />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {window.localStorage.getItem('userType') === 'admin' && (
            <>
             <Link to='/users'>
              <ListItem disablePadding sx={{ border: '1px solid lightgray', marginBottom: '1rem' }}>
                <ListItemButton>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary='List Of Users' />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/ngolist'>
              <ListItem disablePadding sx={{ border: '1px solid lightgray' }}>
                <ListItemButton>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary='List Of NGOs' />
                </ListItemButton>
              </ListItem>
            </Link>
           
            </>
          )}
        </List>
      </nav>
    </Box>
  );
}
