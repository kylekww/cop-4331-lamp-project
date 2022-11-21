import '../../css/styles.css';
import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';

function ProfileButton() {
  const[user, setUser] = useState([]);
  const color = user.color; // This will be replaced with user.color

  useEffect(() => {
    const data = fetch("/api/v1/auth/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => {
      res.json().then((data) => {
        setUser(data.user);
      }) 
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <div class="ProfileContainer">
      <div class="ProfileTool">
        <Avatar onClick={clickProfileButton} style={{border: '3px solid #BABABA'}}
        sx={{ 
          bgcolor: `${color}`,
          '&:hover': {
            borderColor: '#158888'
          },
        }}
        >
          <div class="Text">
            {user.username?.charAt(0).toUpperCase()}
          </div>
        </Avatar>
      </div>
      <div class="TextName">
          Hello {user.name}!
      </div>
    </div>
  );
}

async function clickProfileButton() {
    window.location.href = '/profile';
}



export default ProfileButton;