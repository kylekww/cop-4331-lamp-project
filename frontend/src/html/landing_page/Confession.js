import '../../css/styles.css';
import React, { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';

function Confession(Props) {

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
    
    
    <div className = "confession">
        <div className = "confessionFeed">
          <div className= "confessionFeedWrapper">
          {post.map(post => ( 
            <div className = "confessionPost">
              <div className = "confessionPostWrapper">
                <div className = "confessionPostEdit">
                  <div className = "confessionPostEditButton">
                    <IconButton disabled style={{
                          color: "#BABABA",
                    }}>
                      <EditIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                  </div>
                </div>
                <div className='confessionText'>
                    {post.confession}
                  </div>
                  <div className= 'confessionVotesComments'>
                  
                    <div className = 'votes'>
                      <IconButton onclick={ upvoteConfession } style={{
                          color: "#BABABA",
                        }}>
                          <KeyboardArrowUpIcon sx={{ fontSize: 50 }}/>
                      </IconButton>
                      <Badge badgeContent={1000} max={999} sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: Props.isHot ? "#463bdd" : "rgba(207, 15, 15, 0.9)",
                          color: "white",
                          fontSize: 20,
                          height: 30
                      }}}>
                      </Badge>
                      <IconButton onclick={ downvoteConfession } style={{
                          color: "#BABABA"
                        }}>
                          <KeyboardArrowDownIcon sx={{ fontSize: 50 }}/>
                      </IconButton>
                    </div>

                    <div className='comments'>
                      <Badge badgeContent={100} max={99} sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: Props.isHot ? "#463bdd" : "rgba(207, 15, 15, 0.9)",
                          color: "white"
                      }}}>
                        <IconButton onClick={ clickCommentButton } style={{
                          color: "#BABABA"
                        }}>
                          <CommentIcon sx={{ fontSize: 30 }}/>
                        </IconButton>
                      </Badge>
                    </div>
                  </div>
              </div>
            </div>
            ))}
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
  window.location.href = '/comments';
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