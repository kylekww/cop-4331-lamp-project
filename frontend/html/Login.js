import React from 'react';
import '../css/Login.css';
function Login()
{
    const doLogin = async event => 
    {
        const username = document.getElementById("loginName").value;
        const password = document.getElementById("loginPassword").value;

        const data = await fetch("/api/v1/auth/login.js", {
            method: "POST",
            header: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((b) => b.json());
        
        if(data.result){
            alert("Successul Login");
        }
        else{
            alert("failed");
        }
    };
    return(
        <html>
            <head>
            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
            </head>
        
            <body>
                <div class ="container">
                    <h1>Logo goes here</h1>
                    <div class = "squarebg">
                        <h1>Make your Confessions...</h1>
                        <input type = "text" id = "loginName" placeholder='Username' required />
                        <input type = "password" id = "loginPassword" placeholder='Password' required />
                        <button type = "button" class = "button" onClick = {doLogin}>Login</button>
                        <p id = "noerror"></p>
                        <p>Don't have an account? Signup!</p>
                    </div>   
                </div>
            </body>
        </html>
    );
};
export default Login;
