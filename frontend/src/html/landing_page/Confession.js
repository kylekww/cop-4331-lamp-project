import '../../css/styles.css';
import React, { useState, useEffect } from 'react';
function Confession() {

  const[post, setPost] = useState([]);

  useEffect(() => {
    const displayPosts = async event =>
    {
      const searchVal = 1;
      const oid = "";
      const data = await fetch("/api/v1/confessions/searchConfession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchVal,
          oid,
        }),
      })
      .then(res => {
        res.json().then((data) => {
          console.log(data);
          setPost(data);
        }) 
      })
      .catch(err => {
        console.log(err);
      });
    }
    displayPosts();
  }, [])
  /*
  {post.map(post => (
      <div class = "ConfessionBox">
        {post.confession}
        <div class = "ConfessionBox">Hello</div>
      <div class = "ConfessionBox">blah</div>
      <div class = "ConfessionBox">Test</div>
      <div class = "ConfessionBox">Test</div>
      </div>
    ))}
  */
  return (
    <div>
    
<div className = "confession">
        <div className = "confessionFeed">
          <div className= "confessionFeedWrapper">
          {post.map(post => ( 
            <div className = "confessionPost">
              <div className = "confessionPostWrapper">
                <div className = "confessionPostEdit">
                  <div className = "confessionPostEditButton">
                      This is where edit will go... if we decide to put one. An anon logo could look cool too.
                  </div>
                  <div className='confessionText'>
                    {post.confession}
                  </div>
                  <div className= 'confessionVotesComments'>
                    <div className = 'votes'>
                      The votes go here
                    </div>
                    <div className='comments'>
                      Click here for comments
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div> 
    </div>
    
   </div> 
  );
}

/* Needs to be added:
    - Confession generation
      - Call request for confession text
      - Text resizing depending on size
    - Menu integration for options button
    - Badge integration for total comments
    - Lazy loading
*/

// This needs to match with user ID
async function deleteConfession() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return {text:"This only works if you are the owner of the confession."}
}

// This redirects the user to the comments page
async function clickCommentButton() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return {text:"This will redirect you lol."}
}

/* Both upvote and downvote need to interact with the total vote tally */

async function upvoteConfession() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return {text:"This upvotes the confession"}
}

async function downvoteConfession() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return {text:"This downvotes the confession."}
}

export default Confession;