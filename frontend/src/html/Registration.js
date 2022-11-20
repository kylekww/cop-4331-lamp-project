import React, { useState, useEffect } from 'react';
import '../css/Registration.css';

function Registration() {
    /* Leaving this here for now
    const[color, setColor] = useState("#ffffff");
    const randomizedColor = () => {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        setColor(randomColor);
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

    const doRegistration = async event => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value;
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);  // This needs to be added to each user on registration

        if ((passwordRequirements(password)) && (validEmail(email))) {
            const data = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    email,
                    color
                }),
            }).then(res => {
                if (res.status !== 201) alert("Invalid registration");
                else {
                    alert("Registration was successful.");
                    window.location.href = '/';
                }
            })
                .catch(err => {
                    console.log(err);
                });

            // This is a bootleg solution. "Might" need attention.
            console.log(data);
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

    };
    return (
        <div class="container">
            <h1>Logo goes here</h1>
            <div class="squarebg">
                <h1>Signup </h1>
                <input type="text" id="name" placeholder="Name" required />
                <input type="text" id="username" placeholder="Username" required />
                <input type="text" id="email" placeholder="Email" required />
                <input type="password" id="password" placeholder="Password" required />
                <span class="passwordRequirements">
                    Requirements: <br />
                    8 Characters <br />
                    1 Number <br />
                    1 Upper Case Character <br />
                    1 Lower Case Character <br />
                </span>
                <p id="noerror">Error: Username already taken!</p>
                <button type="button" class="button" onClick={doRegistration}>Create Account</button>
                <p>Already have an account? <a href="/">Login!</a></p>
            </div>
        </div>
    );
};

export default Registration;
