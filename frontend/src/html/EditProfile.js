import React, { useState, useEffect } from 'react';

function EditProfile({ open, handleClose }) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const viewProfile = async event => {
            const data = await fetch("/api/v1/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    res.json().then((data) => {
                        console.log(data);
                        setUser(data.user);
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        };
        viewProfile()
    }, [])

    function passwordRequirements(password) {
        let upperCase = false;
        let lowerCase = false;
        let passwordNumber = false;
        let passwordLength = false;

        if(!password){
            return true;
        }

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
        var temp = email.toString();
        const knightsEmailArray = knightsEmail.split("")
        const emailArray = temp.split("")
        let validation = false;
        let j = 0;

        if(!email){
            return true;
        }

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

    const profileReturn = async event => {
        window.location.href = '/profile';
    }

    const makeEdits = async event => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;

        console.log("Username: " + username.toString());
        console.log("Password: " + passwordRequirements(password));
        console.log("Password: " + password.toString());
        console.log("Email: " + validEmail(email));
        console.log("Email: " + email.toString());
        
        if ((passwordRequirements(password)) && (validEmail(email))) {
            const data = await fetch("/api/v1/auth/editProfile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    email
                }),

            })
                .then(res => {
                    res.json().then((data) => {
                        console.log(data);
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            handleClose();
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
    }
    return (
        <div class="container">
            <img src={require('../images/NewIcon.jpg')} class="HushIcon" />
            <div class="squarebg">
                <h1>Edit Profile </h1>
                <input type="text" id="username" placeholder={user.username} required />
                <input type="text" id="email" placeholder={user.email} required />
                <input type="password" id="password" placeholder="********" required />
                <span class="passwordRequirements">
                    Requirements: <br />
                    8 Characters <br />
                    1 Number <br />
                    1 Upper Case Character <br />
                    1 Lower Case Character <br />
                </span>
                <p id="noerror">Error: Username already taken!</p>
                <button type="button" class="return" onClick={makeEdits}>Make Edits</button>
                <button type="button" class="return" onClick={profileReturn}>Return to Profile</button>
            </div>
        </div>
    );
};

export default EditProfile;
