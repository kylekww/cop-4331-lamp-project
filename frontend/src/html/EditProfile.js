import React, { useState, useEffect } from 'react';
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
function EditProfile({ open, handleClose }) {
const [user, setUser] = useState([]);
const[reg, validReg] = useState('4:78AM Moment');
const [long, isLong] = useState(false);
const [number, hasNumber] = useState(false)
const[up, hasUppercase] = useState(false)
const[low, hasLowercase] = useState(false)
const[visible, isVisible] = useState(false);
const[error, hasError] = useState(true);
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

    function passwordRequirements(password) {
        let upperCase = false;
        let lowerCase = false;
        let passwordNumber = false;
        let passwordLength = false;
        
        if(!password){
            return true;
        }

        if (password.length >= 8) {
            passwordLength = true;
            isLong(true);
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
        isLong(passwordLength)
        hasNumber(passwordNumber)
        hasUppercase(upperCase)
        hasLowercase(lowerCase)
        if (passwordLength && passwordNumber && upperCase && lowerCase) {
            return true;
        } else {
            isVisible(true)
            validReg('Please check that you have met all of the password requirements!')
            return false;
        }
    }

    function validEmail(email) {
        let knightsEmail = "@knights.ucf.edu";
        var temp = email.toString();
        const knightsEmailArray = knightsEmail.split("")
        const emailArray = temp.split("")
        let validation = false;
        let j = 0;

        if(!email){
            return true;
        }

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

    const profileReturn = async event => {
        window.location.href = '/profile';
    }

    const makeEdits = async event => {
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;

        
        
        if ((passwordRequirements(password)) && (validEmail(email))) {
            const data = await fetch("/api/v1/auth/editProfile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                    email
                }),

            })
                .then(res => {
                    isVisible(true)
                    res.json().then((data) => {
                        console.log(data);
                    })
                    hasError(false)
                    validReg('Success! Making your changes now...')
                    window.location.href = '/editprofile';
                })
                .catch(err => {
                    console.log(err);
                });
        } else if ((!passwordRequirements(password)) && validEmail(email)) {
            console.log("Password must meet all requirements!");
        }
        else if (passwordRequirements(password) && (!validEmail(email))) {
            console.log("You must use your knights email!");
            isVisible(true)
            validReg('Please use a UCF email!')
        }
        else {
            console.log("Password must meet all requirements!");
            console.log("You must use your knights email!");
            isVisible(true)
            validReg('Please use a UCF email!')
        }
    }
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
              Edit your profile here!
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={user.name}
                name="Full Name"
                inputProps={{ "data-testid": "name" }}
                autoComplete="fullname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={user.username}
                name="username"
                inputProps={{ "data-testid": "username" }}
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={user.email}
                name="Email"
                inputProps={{ "data-testid": "email" }}
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
                inputProps={{ "data-testid": "password" }}
                autoComplete="current-password"
              />
              <Typography component="h1" variant="h6"sx ={{
                opacity: visible ? '100%' : '0%',
                color: error ? 'rgb(227, 19, 19)' : 'rgba(68,122,154,1)'
              }}>
                {reg}
              </Typography>
              <Button
                type="submit"
                fullWidth
                data-testid="register-button"
                variant="contained"
                onClick = {makeEdits}
                sx={{ mt: 3, 
                    mb: 2, 
                    backgroundColor: 'rgb(227, 19, 19)',
                    '&:hover': {
                    backgroundColor: 'rgb(222, 98, 28)',
                    color: '#ffffff',
                }, }}
                
              >
                Confirm Changes
              </Button>
              <Grid container>
                <Grid item xs>
                <Typography component="h1" variant="h6"sx ={{
                color: 'rgb(227, 19, 19)'
              }}>
                  {"Password Requirements:"}
                </Typography>
                <Typography component="h1" variant="h6" sx ={{
                color: long ? 'rgb(96,171,52)' : 'rgb(227, 19, 19)'
              }}>
                  8 Characters
                </Typography>
                <Typography component="h1" variant="h6"  sx ={{
                color: number ? 'rgb(96,171,52)' : 'rgb(227, 19, 19)'
              }}>
                  1 Number
                </Typography>
                <Typography component="h1" variant="h6"  sx ={{
                color: up ? 'rgb(96,171,52)' : 'rgb(227, 19, 19)'
              }}>
                  1 Upper Case Character
                </Typography> 
                <Typography component="h1" variant="h6"  sx ={{
                color: low ? 'rgb(96,171,52)' : 'rgb(227, 19, 19)'
              }}>
                1 Lower Case Character
                </Typography>     
                </Grid>
                <Grid item>
                  <Link href="/profile" variant="body2" data-testid="login-link">
                    {"Return to View Profile"}
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
          ><img src={require('../images/HotIconGiant.png')} class="HushIconLogin" data-testid="register-icon"/></Grid>
      </Grid>
    </ThemeProvider>
    );
};

export default EditProfile;
