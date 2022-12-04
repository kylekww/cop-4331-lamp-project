import '../../css/styles.css';
import React, { useState, useEffect, MouseEvent, useRef, useCallback } from 'react';
import searchComments from './searchComments';
import CommentPost from './CommentPost';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfessionVotes from './ConfessionVotes';
import { Badge, Tooltip, IconButton } from '@mui/material';

function Confession(Props) {

  // Get the confession
  const oid = Props.oid;
  const[vote, setVote] = useState(0);
  const[interacted, setInteracted] = useState(null);
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
        setVote(data.netVotes);
        setInteracted(data.userInteracted);
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

              <ConfessionVotes post={confession} vote={vote} setVote={setVote} interacted={interacted} setInteracted={setInteracted}/>

              <div class="largeConfessionText">
                  {confession.confession}
              </div>

              <div>
                <KeyboardArrowDownIcon sx={{ fontSize: 100 }} style={{
                  color: 'white'
                }}/>
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

export default Confession;