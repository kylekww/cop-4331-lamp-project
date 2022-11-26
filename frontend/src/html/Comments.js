import '../css/styles.css';
import Replies from './comments_page/Replies';
import Confession from './comments_page/Confession';
import NewCommentButton from './comments_page/NewCommentButton'
import { useState } from 'react';

/* Need to add logo to page */

function Comments() {
  const[isHot, setIsHot] = useState([false]);
  const toggleIsHot = () => {
    setIsHot(current => !current);
  }

  return (
    <>
        <div style={{
            alignContent: "center",
            justifyContent: "center",
            display: "flex"
        }}>
            <Confession />
            <Replies />
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