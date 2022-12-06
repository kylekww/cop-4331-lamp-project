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
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
export default function Registration() {

    function passwordRequirements(password) {
        let upperCase = false;
        let lowerCase = false;
        let passwordNumber = false;
        let passwordLength = false;

        if (password.length >= 8) {
            passwordLength = true;
        }

        for (let i = 0; i < password.length; i++) {
            if (password[i] >= "0" && password[i] <= "9") {
                passwordNumber = true;
            } else if (password[i].toUpperCase() === password[i]) {
                upperCase = true;
            } else if (password[i].toUpperCase() !== password[i]) {
                lowerCase = true;
            }
        }

        if (passwordLength && passwordNumber && upperCase && lowerCase) {
            return true;
        } else {
            return false;
        }
    }

    function validEmail(email) {
        let knightsEmail = "@knights.ucf.edu";
        const knightsEmailArray = knightsEmail.split("")
        const emailArray = email.split("")
        let validation = false;
        let j = 0;

        for (let i = (emailArray.length - knightsEmailArray.length); i < emailArray.length; i++) {
            if (knightsEmailArray[j] == emailArray[i]) {
                validation = true;
                j++;
            } else {
                validation = false;
                break;
            }
        }
        return validation;
    }

    const doRegistration = async event => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value;
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);  // This needs to be added to each user on registration

        if ((passwordRequirements(password)) && (validEmail(email))) {
            const data = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    email,
                    color
                }),
            }).then(res => {
                if (res.status !== 201) alert("Invalid registration");
                else {
                    alert("Registration was successful.");
                    window.location.href = '/';
                }
            })
                .catch(err => {
                    console.log(err);
                });

            // This is a bootleg solution. "Might" need attention.
            console.log(data);
        } else if ((!passwordRequirements(password)) && validEmail(email)) {
            console.log("Password must meet all requirements!");
        }
        else if (passwordRequirements(password) && (!validEmail(email))) {
            console.log("You must use your knights email!");
        }
        else {
            console.log("Password must meet all requirements!");
            console.log("You must use your knights email!");
        }

    };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        
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
          <Typography component="h1" variant="h5" color = 'rgb(227, 19, 19)'>
              Hush UCF
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'rgb(227, 19, 19)' }}>
            <AppRegistrationIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color = 'rgb(227, 19, 19)'>
              Got a secret to share? Register Now!
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="Full Name"
                autoComplete="fullname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Knights Email Account"
                name="Email"
                autoComplete="Email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick = {doRegistration}
                sx={{ mt: 3, 
                    mb: 2, 
                    backgroundColor: 'rgb(227, 19, 19)',
                    '&:hover': {
                    backgroundColor: 'rgb(222, 98, 28)',
                    color: '#ffffff',
                }, }}
                
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                <span variant="body2">
                    Password Requirements: <br />
                    8 Characters <br />
                    1 Number <br />
                    1 Upper Case Character <br />
                    1 Lower Case Character <br />
                </span>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Already have an account? Login!"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx = {{
            backgroundImage: 'linear-gradient(rgb(222, 98, 28), rgb(227, 19, 19));'
          }}
          ><img src={require('../images/HotIconGiant.png')} class="HushIconLogin"/></Grid>
      </Grid>
    </ThemeProvider>
  );
}