import { ListItemSecondaryAction } from '@mui/material';
import React, { useState, setState } from 'react';
import '../css/Profile.css';

function Profile() {
    const user = {
        username: "",
        name: ""
    }
    const viewProfile = async event => 
    {
        const data = await fetch("/api/v1/auth/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
          console.log(res);
          res.json().then((data) => {
            console.log(data);
            console.log(data.user.name);
            console.log(data.user.username);
            user.name = data.user.name;
            user.username = data.user.username;
          }) 
        })
        .catch(err => {
          console.log(err);
        });
       //this.setState
    };
    
    const logOut = async event => 
    {
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
    return (
        
        <div class ="container">
            <h1>Logo goes here</h1>
            <div class = "squarebg">
                <h1>Profile View</h1>
                <p id = "profile"></p>{
                    user.map((item) => (
                        <ol key = { item.user } >
                        User_Name: { item.username }, 
                        Full_Name: { item.name }
                        </ol>   
                    ))
                }
                    
                    <button type = "button" class = "logout" onClick = {logOut}>Logout</button>
                    
                    
    
                
            </div>   
        </div>
    );
}

export default Profile;
