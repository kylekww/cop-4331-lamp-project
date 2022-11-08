import React, { useState } from 'react';
import '../css/login.css';

function Login() {
    const doLogin = async event => 
    {
        const username = document.getElementById("loginName").value;
        const password = document.getElementById("loginPassword").value;

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
          if(res.status == 404) alert("Invalid username");
          else if(res.status == 401) alert("Invalid password");
          else {
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
        <div class ="container">
            <h1>Logo goes here</h1>
            <div class = "squarebg">
                <h1>Make your Confessions...</h1>
                <input type = "text" id = "loginName" placeholder='Username' required />
                <input type = "password" id = "loginPassword" placeholder='Password' required />
                <button type = "button" class = "button" onClick = {doLogin}>Login</button>
                <p id = "noerror"></p>
                <p>Don't have an account? <a href = "/register">Signup!</a></p>
            </div>   
        </div>
    );
}

export default Login;
