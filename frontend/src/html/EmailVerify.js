import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useParams } from "react-router-dom";

function EmailVerify() {
    const token = useParams().token;
    
    useEffect(() => {
        const response = fetch('/api/v1/auth/emailVerify/' + token, {
            mode: 'no-cors',
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(res => {
            if(res.status !== 201) alert("Email verification failed");
            else {
              window.location.href = '/';
            }
        })
        .catch(err => {
            console.log(err);
        })
    });

    return (
        <div>
            <CheckCircleOutlineIcon style={{fill: 'green'}} sx={{ fontSize: 164}} />
        </div>
    );
}

export default EmailVerify;
