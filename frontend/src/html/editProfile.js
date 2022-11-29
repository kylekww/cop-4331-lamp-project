import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';

function editProfile({ open, handleClose }) {

  /*const [textInput, setTextInput] = useState('');

  const handleTextInputChange = event => {
    setTextInput(event.target.value);
  };*/

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
  
  const makeEdits = async event => {
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
          username,
          password,
          email
        }),

      })
        .then(res => {
          res.json().then((data) => {
            console.log(data);
          })
        })
        .catch(err => {
          console.log(err);
        });
      handleClose();
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
  }
  return (
    <Dialog open={open}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label={user.email}
          type="email"
          fullWidth
          variant="standard"
          onChange={handleTextInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label={user.username}
          type="username"
          fullWidth
          variant="standard"
          onChange={handleTextInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label={user.password}
          type="password"
          fullWidth
          variant="standard"
          onChange={handleTextInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={makeEdits}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default editProfile;
