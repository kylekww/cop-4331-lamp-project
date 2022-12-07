import React, { useState, useEffect } from 'react';
import '../css/styles.css';

function ResetPassword() {
    const [user, setUser] = useState([]);
    const [text, setText] = useState('A request will be sent to your knights email.');

    const doPasswordSend = async event => {
        const email = document.getElementById("email").value;

        const data = await fetch("/api/v1/auth/resetLink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email
            }),
        }).then(res => {
            if (res.status == 500) setText("This user does not exist.");
            else {
                setText("An email was sent successfully. Check your knights mail to reset your password!");
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div class="container">
            <img src={require('../images/NewIcon.jpg')} class="HushIcon"/>
            <div class="squarebg">
                <h1>Reset Password </h1>
                <input type="email" id="email" placeholder="Email" required data-testid="email"/>
                <span class="passwordRequirements" data-testid="text">
                    {text} <br />
                </span>
                <button type="button" class="button" data-testid="button" onClick={doPasswordSend}>Send email</button>
                <p>Nevermind? <a href="/">Login!</a></p>
            </div>
        </div>
    );
};

export default ResetPassword;