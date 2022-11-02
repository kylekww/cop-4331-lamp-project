import React from 'react';
import '../css/Registration.css';

function Registration() {
    const doRegistration = async event => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value;
        /*const lastName = document.getElementById("lastName").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const email = document.getElementById("email").value;*/

        const data = await fetch("/api/v1/auth/Registration", {
            method: "POST",
            header: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                name,
                /*lastName,
                phoneNumber,
                email,*/
            }),
        }).then((b) => b.json());

        if (data.result) {
            alert("Successful Registration");
        }
        else {
            alert("failed");
        }
    };
    return (
        <html>
            <head>
                <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
            </head>

            <body>
                <div class="container">
                    <h1>Logo</h1>
                    <div class="squarebg">
                        <h1>Signup</h1>
                        <input type="text" id="firstName" placeholder="First Name" required />
                        <input type="text" id="lastName" placeholder="Last Name" required />
                        <input type="text" id="email" placeholder="UCF Knights Email" required />
                        <input type="text" id="phoneNumber" placeholder="Phone Number" required />
                        <input type="text" id="loginName" placeholder="Username" required />
                        <input type="password" id="loginPassword" placeholder="Password" required />
                        <span class="passwordRequirements">
                            Requirements: <br />
                            8 Characters <br />
                            1 Number <br />
                            1 Upper Case Character <br />
                            1 Lower Case Character <br />
                        </span>
                        <p id="noerror">Error: Username already taken!</p>
                        <button type="button" class="button" onClick={doRegistration}>Create Account</button>
                        <button type="button" id="registerButton">Create Account</button>
                        <p>Already have an account? <a href="/">Login!</a></p>
                    </div>
                </div>
            </body>
        </html>
    );
};
export default Registration;
