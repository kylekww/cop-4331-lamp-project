import { ListItemSecondaryAction } from '@mui/material';
import React, { useState, useEffect } from 'react';
import '../css/Profile.css';

function Profile() {
    const [users, setUsers] = useState();
    const viewProfile = async event => 
    {
        const data = await fetch("/api/v1/auth/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
          res.json().then((data) => {
            console.log(data);
            console.log(data.user.name);
            console.log(data.user.username);
            setUsers(data);
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
    useEffect(() => {
        viewProfile();
      }, []);
    return (
        
        <div class ="container">
            <h1>Logo goes here</h1>
            <div class = "squarebg">
                <h1>Profile View</h1>
                <p id = "profile">The profile:
                {users && users.map((user) => {
                    <p>
                        Username: {user.username}
                        Full Name:{user.name}
                    </p>
                })}
                </p>    
                    <button type = "button" class = "logout" onClick = {logOut}>Logout</button>
                    
                    
    
                
            </div>   
        </div>
    );
}

export default Profile;
