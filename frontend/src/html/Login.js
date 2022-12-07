import { yellow } from '@mui/material/colors';
import React, { useState } from 'react';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Login() {

  const [login, validLogin] = useState('I wrote this at 4:78AM');
  const [visible, isVisible] = useState(false);
  const [error, hasError] = useState(true)
  //const[visible, isVisible] = useState(false);
  const theme = createTheme();
  const doLogin = async event => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username)
    console.log(password)
    const data = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(res => {
        isVisible(true)
        if (res.status == 404) validLogin('Invalid Username')
        else if (res.status == 401) validLogin("Invalid Password");
        else {
          hasError(false)
          validLogin("Success! Logging in...");
          window.location.href = '/landing';
        }
      })
      .catch(err => {
        console.log(err);
      });

    /* This is a bootleg solution. Ignore for now
    if(data.message.localeCompare("you are successfully logged in.") == 0){
        alert("Successul Login");
    }
    else{
        alert("failed");
    }
    */
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}

        ><img src={require('../images/NewIconGiant.png')} className="HushIconLogin" data-testid="login-icon" />
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
            <Avatar sx={{ m: 1, bgcolor: 'rgba(89,35,206,1)' }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Something on your mind? Sign in!
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                inputProps={{ "data-testid": "username" }}
                name="username"
                title="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                inputProps={{ "data-testid": "password" }}
                type="password"
                title="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography component="h1" variant="h6" data-testid="error-text" id="error-text" sx={{
                visibility: visible ? 'visible' : 'hidden',
                color: error ? 'rgba(89,35,206,1)' : 'rgba(68,122,154,1)'
              }}>
                {login}
              </Typography>
              
              <Button
                type="submit"
                data-testid="login-button"
                title="LoginButton"
                fullWidth
                variant="contained"
                onClick={doLogin}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: 'rgba(89,35,206,1)',
                  '&:hover': {
                    backgroundColor: 'rgba(128,199,239,1)',
                    color: '#3c52b2',
                  },
                }}

              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/resetpassword" variant="body2">
                    {"Forgot password? Reset it!"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
