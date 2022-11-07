import { ListItemSecondaryAction } from '@mui/material';
import React, { useState } from 'react';
import '../css/Profile.css';

function Profile() {
    
    const viewProfile = async event => 
    {
        const data = await fetch("/api/v1/auth/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
          
          
        })
        .catch(err => {
          console.log(err);
        });
       
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
                
                 <button type = "button" class = "logout" onClick = {logOut}>Logout</button>
                    
                    
    
                
            </div>   
        </div>
    );
}

export default Profile;
