import React, { useState, useEffect } from 'react';
import '../css/styles.css';

function ResetPassword() {
    const [user, setUser] = useState([]);

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
            if (res.status == 500) alert("This user does not exist.");
            else {
                alert("An email has been sent.");
                window.location.href = '/';
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
                <input type="email" id="email" placeholder="Email" required />
                <span class="passwordRequirements">
                    A request will be sent to your knights email <br />
                </span>
                <button type="button" class="button" onClick={doPasswordSend}>Send email</button>
                <p>Nevermind? <a href="/">Login!</a></p>
            </div>
        </div>
    );
};

export default ResetPassword;