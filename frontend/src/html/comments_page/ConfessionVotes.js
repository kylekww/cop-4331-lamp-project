import '../../css/styles.css';
import React, { useState, useEffect, MouseEvent, useRef, useCallback } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Badge, Tooltip, IconButton } from '@mui/material';

function ConfessionVotes(Props) {

  // Get the confession
  const[deleted, setDeleted] = useState(Props.post.deleted != 0 ? true:false);

  // Upvote/downvote help
  const upvoteHelper = (e) => {
    e.currentTarget.disabled = true;
    //if(deleted) return null
    upvoteConfession(e.currentTarget.value);
    if(Props.interacted == 1){
        console.log('this user was interacted before the upvote')
        
        Props.setInteracted(0)
        Props.setVote(Props.vote - 1)
    } 
    if(Props.interacted == 0){
        console.log('this user was not interacted before the upvote')
        Props.setInteracted(1)
        Props.setVote(Props.vote + 1)
    }
    if(Props.interacted == -1){
        console.log('downvoted before vote, now upvoted')
        Props.setInteracted(1)
        Props.setVote(Props.vote + 2)
    }
  }
  const downvoteHelper = (e) => {
    e.currentTarget.disabled = true;
    downvoteConfession(e.currentTarget.value);
    //if(deleted) return null
    if(Props.interacted == -1){
        console.log('downvoted before, now neutral')
        Props.setInteracted(0)
        Props.setVote(Props.vote + 1)
    }
    if(Props.interacted == 0){
        console.log('neutral to downvoted')
        Props.setInteracted(-1)
        Props.setVote(Props.vote - 1)
    }
    if(Props.interacted == 1){
        console.log('upvote to downvote')
        Props.setInteracted(-1)
        Props.setVote(Props.vote - 2)
    }
  }

  return (
    <>
        <div className = 'votes'>
            <Tooltip placement = 'top' title="Upvote">
                <IconButton value = {Props.post._id} onClick={ upvoteHelper } style={{
                    color: Props.interacted != 1 ? "#BABABA" : ("#463bdd")
                }}>
                    <KeyboardArrowUpIcon sx={{ fontSize: 100 }}/>
                </IconButton>
            </Tooltip>
            <Badge showZero badgeContent = {Props.vote} max={999} sx={{
                "& .MuiBadge-badge": {
                backgroundColor: "#463bdd",
                color: "white",
                fontSize: 20,
                height: 30
            }}}>
            </Badge>
            <Tooltip title="Downvote">
                <IconButton value = {Props.post._id} onClick={ downvoteHelper } style={{
                    color: Props.interacted != -1 ? "#BABABA" : ("#463bdd")
                }}>
                    <KeyboardArrowDownIcon sx={{ fontSize: 100 }}/>
                </IconButton>
            </Tooltip>
        </div>
    </>
  );
}

/* Both upvote and downvote need to interact with the total vote tally */

async function upvoteConfession(id) {
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

async function downvoteConfession(id) {
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

export default ConfessionVotes;