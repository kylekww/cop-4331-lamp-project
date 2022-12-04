import '../../css/styles.css';
import React, { useState } from "react";
import { MenuItem, Menu, ListItemIcon, ListItemText, Badge, Tooltip, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function ConfessionPost(Props) {
    const[vote, setVote] = useState(Props.post.netVotes);
    const[interacted, setInteracted] = useState(Props.post.userInteracted)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const[deleted, setDeleted] = useState(Props.post.deleted != 0 ? true:false)
    const open = Boolean(anchorEl);

    if(deleted)
      return null;

    const handleOptionsClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleOptionsClose = () => {
        setAnchorEl(null);
      };
      const handleEditPost = () => {
        setAnchorEl(null);
        console.log("Edit post");
      };
      const handleDeletePost = (e) => {
        if(deleted) return null
        e.currentTarget.disabled = true;
        setAnchorEl(null);
        deleteComment(Props.post._id)
        setDeleted(true)
        console.log("Delete post");
      };

        
      
      const upvoteHelper = (e) => {
        if(deleted) return null;
        upvoteConfession(e.currentTarget.value);
        if(interacted == 1){
            console.log('this user was interacted before the upvote')
            
            setInteracted(0)
            setVote(vote - 1)
        } 
        if(interacted == 0){
            console.log('this user was not interacted before the upvote')
            setInteracted(1)
            setVote(vote + 1)
        }
        if(interacted == -1){
            console.log('downvoted before vote, now upvoted')
            setInteracted(1)
            setVote(vote + 2)
        }
      }
    
      const downvoteHelper = (e) => {
        if(deleted) return null
        downvoteConfession(e.currentTarget.value);
        if(interacted == -1){
            console.log('downvoted before, now neutral')
            setInteracted(0)
            setVote(vote + 1)
        }
        if(interacted == 0){
            console.log('neutral to downvoted')
            setInteracted(-1)
            setVote(vote - 1)
        }
        if(interacted == 1){
            console.log('upvote to downvote')
            setInteracted(-1)
            setVote(vote - 2)
        }

      }

    return(
        <div className = "commentPost">
          <div className = "commentPostWrapper">
            <div className = "commentLeftSide">
              <div className = "confessionPostEdit">
                <div className = "confessionPostEditButton">
                  <Tooltip title="Delete Comment">
                    <IconButton 
                      id="edit-button" 
                      onClick={ handleDeletePost } 
                      style={{
                          color: "#BABABA",
                          display: Props.post.userCreated ? 'block' : 'none',
                    }}>
                      <DeleteIcon sx={{ fontSize: 40 }}/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>

              <div className= 'confessionVotesComments'>
                <div className = 'votes'>
                  <Tooltip title="Upvote" placement = 'top'>
                    <IconButton value = {Props.post._id} onClick={ upvoteHelper } style={{
                        color: interacted != 1 ? "#BABABA" : ("#463bdd")
                      }}>
                        <KeyboardArrowUpIcon sx={{ fontSize: 50 }}/>
                    </IconButton>
                  </Tooltip>
                  <Badge badgeContent = {vote} max={999} sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#463bdd",
                      color: "white",
                      fontSize: 20,
                      height: 30
                  }}} showZero>
                  </Badge>
                  <Tooltip title="Downvote">
                    <IconButton value = {Props.post._id} onClick={ downvoteHelper } style={{
                      color: interacted != -1 ? "#BABABA" : ("#463bdd")
                    }}>
                      <KeyboardArrowDownIcon sx={{ fontSize: 50 }}/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className='commentText'>
              {Props.post.comment}
            </div>
            <div>
              <KeyboardArrowDownIcon sx={{ fontSize: 50 }} style={{
                color: '#f1eee8'
              }}/>
            </div>
        </div>
      </div>
    )
}

async function upvoteConfession(id) {
    const vote = 1;
    const type = 2;
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
    const type = 2;
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

  async function deleteComment(id){
    const data = await fetch("/api/v1/comments/deleteComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

  export default ConfessionPost;