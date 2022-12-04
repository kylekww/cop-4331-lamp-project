import '../../css/styles.css';
import React, { useState, useEffect, MouseEvent, useRef, useCallback } from 'react';
import searchComments from './searchComments';
import CommentPost from './CommentPost';

function Confession(Props) {

  // Get the confession
  const oid = Props.oid;
  const[searchVal, setSearch] = useState(3);
  const [confession, setConfession] = useState([]);
  useEffect(() => {
    const data = fetch("/api/v1/confessions/searchConfession", {
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
        setConfession(data);
        //console.log(data);
      })
    })
    .catch(err => {
      console.log(err);
    })}, []);

  
  // Post info
  const[commentSearchVal, setCommentSearch] = useState(2);
  const[commentoid, setCommentOid] = useState('');

  // Pass values in this order: searchVal, comment oid, confession oid
  const {post, wasLastList} = searchComments(commentSearchVal, commentoid, oid);

  // Edit menu logic
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleScroll = (e) => {
    const bottom = Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if(bottom && !wasLastList){
      if(post.length - 1 < 0){
        console.log('This never happens lol');
        setCommentOid('');
      }
      //console.log(post[post.length - 1]._id)
      //console.log('We are here');
      setCommentOid(post[post.length - 1]._id);
    }
  }

  return (
    <>
    {/* Large confession */}
      <div class="largeCommentsContainer">
          <div class="largeConfession">
              <div class="largeConfessionText">
                  {confession.confession}
              </div>
          </div>
          <div class="commentsPageTip">
              How do YOU feel about this?
              <element class="Line">
              </element>
          </div>
      </div>

      {/* Comments */}
      <div className= "commentsFeedWrapper" onScroll={handleScroll}>
        {post.map((posts) => (
          <CommentPost post = {posts} />
        ))}
      </div>
    </>
  );
}

async function deleteComment() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return {text:"This only works if you are the owner of the comment."}
}

/* Both upvote and downvote need to interact with the total vote tally */

async function upvoteComment(id) {
  const vote = 1;
  const type = 1;
  const data = await fetch("/api/v1/votes/changeVote", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vote,
      type,
      id
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
  
}

async function downvoteComment(id) {
  const vote = -1;
  const type = 1;
  const data = await fetch("/api/v1/votes/changeVote", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vote,
      type,
      id
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
}

export default Confession;