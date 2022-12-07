import { ListItemSecondaryAction } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import '../css/styles.css';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Tooltip, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
function Profile() {
    const [user, setUser] = useState([]);
  //const[visible, isVisible] = useState(false);
  const theme = createTheme();
    useEffect(() => {
        const viewProfile = async event => {
            const data = await fetch("/api/v1/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    res.json().then((data) => {
                        console.log(data);
                        setUser(data.user);
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        };
        viewProfile()
    }, [])

    const logOut = async event => {
        const data = await fetch("/api/v1/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                window.location.href = '/';
            })
            .catch(err => {
                console.log(err);
            });
    };
    const returnLanding = async event => {
        window.location.href = '/landing';
    }
    const editProfile = async event => {
        window.location.href = '/editprofile';
    }

    return (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
    
            ><img src={require('../images/NewIconGiant.png')} className="HushIconLogin" title="LoginIcon" />
              
            </Grid>
    
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Hush UCF
                </Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs>
                    <Tooltip title="Return to Landing">
                        <IconButton onClick = {returnLanding}>
                        <KeyboardReturnIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs>
                    <Tooltip title="Edit Changes">
                        <IconButton  onClick = {editProfile}>
                            <EditIcon />
                        </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs = {2}>
                    <Tooltip title="Logout">
                        <IconButton onClick = {logOut}>
                            <LogoutIcon />
                        </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                
                <Box sx={{ mt: 1 }}>
                <Typography component="h1" variant="h6">
                  Username: {user.username}
                  
                </Typography> 
                <Typography component="h1" variant="h6">
                  Fullname: {user.name}
                  
                </Typography>  
                  
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );

}

export default Profile;
