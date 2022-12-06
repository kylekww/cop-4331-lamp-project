import '../../css/styles.css';
import React, { useState } from "react";
import { Badge, Tooltip, IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
function ConfessionPost(Props) {
    const[vote, setVote] = useState(Props.post.netVotes);
    const[interacted, setInteracted] = useState(Props.post.userInteracted);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const[deleted, setDeleted] = useState(Props.post.deleted != 0 ? true:false)
    const[id, setId] = useState(Props.post._id);
    const open = Boolean(anchorEl);

    if(deleted)
      return null;

      const handleDeletePost = (e) => {
        if(deleted) return null
        e.currentTarget.disabled = true;
        setAnchorEl(null);
        deleteConfession(Props.post._id)
        setDeleted(true)
        console.log("Delete post");
      };
      const delay = ms => new Promise(
       
        resolve => setTimeout(resolve, ms)
      );
      
      const upvoteHelper = async (e) => {
        console.log('start')
        await delay(400);
        if(deleted) return null
        upvoteConfession(id);
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
        
        console.log('end')
      }
    
      const downvoteHelper = async (e) => {
        await delay(400);
        downvoteConfession(id);
        if(deleted) return null
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

    async function clickCommentButton() {
      await delay(400);
      window.location.href = '/comments/' + Props.post._id;
      if(deleted) return null
    }

    return(
            <div className = "confessionPost">
              <div className = "confessionPostWrapper">

                <div class="confessionLeftColumn">
                  <div className = "confessionPostEdit">
                    <div className = "confessionPostEditButton">
                      <Tooltip title="Delete Confession">
                        <IconButton 
                          id="edit-button" 
                          onClick={ handleDeletePost } 
                          aria-controls={open ? 'edit-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
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
                      <Tooltip title="Upvote">
                        <IconButton value = {Props.post._id} placement = 'top' onClick={ upvoteHelper } style={{
                            color: interacted != 1 ? "#BABABA" : (Props.isNew ? "#463bdd" : "rgba(207, 15, 15, 0.9)")
                          }}>
                            <KeyboardArrowUpIcon sx={{ fontSize: 50 }}/>
                        </IconButton>
                      </Tooltip>
                      <Badge badgeContent = {vote} max={999} sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: Props.isNew ? "#463bdd" : "rgba(207, 15, 15, 0.9)",
                          color: "white",
                          fontSize: 20,
                          height: 30
                      }}} showZero>
                      </Badge>
                      <Tooltip title="Downvote">
                        <IconButton value = {Props.post._id} onClick={ downvoteHelper } style={{
                            color: interacted != -1 ? "#BABABA" : (Props.isNew ? "#463bdd" : "rgba(207, 15, 15, 0.9)")
                          }}>
                            <KeyboardArrowDownIcon sx={{ fontSize: 50 }}/>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div className='confessionText'>
                  {Props.post.confession}
                </div>

                <div className='comments'>
                  <Badge badgeContent= {Props.post.comments.length} max={99} sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: Props.isNew ? "#463bdd" : "rgba(207, 15, 15, 0.9)",
                      color: "white"
                  }}} showZero>
                    <Tooltip title="Add Comment">
                      <IconButton onClick={ clickCommentButton } style={{
                        color: "#BABABA"
                      }}>
                        <CommentIcon sx={{ fontSize: 30 }}/>
                      </IconButton>
                    </Tooltip>
                  </Badge>
                </div>

              </div>
            </div>
    )
}

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

  async function deleteConfession(id){
    const data = await fetch("/api/v1/confessions/deleteConfession", {
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