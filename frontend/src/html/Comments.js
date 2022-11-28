import '../css/styles.css';
import Confession from './comments_page/Confession';
import NewCommentButton from './comments_page/NewCommentButton'
import { useState } from 'react';
import { useParams } from "react-router-dom";

/* Need to add logo to page */

function Comments() {
  // Get the comment id
  const oid = useParams().token;

  return (
    <>
        <div style={{
            alignContent: "center",
            justifyContent: "center",
            display: "flex"
        }}>
            <Confession oid={oid}/>
        </div>
        <NewCommentButton />
    </>
  );
}

async function logout() {
  const response = await fetch('https://hushucf.herokuapp.com/api/v1/auth/logout', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return response.json();
}

export default Comments;