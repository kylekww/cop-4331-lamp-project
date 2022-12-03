import '../../css/styles.css';
import React, { useState } from "react";
import { MenuItem, Menu, ListItemIcon, ListItemText, Badge, Tooltip, IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
function ConfessionPost(Props) {
    const[vote, setVote] = useState(Props.post.netVotes);
    const[interacted, setInteracted] = useState(Props.post.userInteracted)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    //console.log(isNew._currentValue)
    const handleOptionsClick = (event) => {
      event.currentTarget.disabled = true;
        setAnchorEl(event.currentTarget);
      };
      const handleOptionsClose = () => {
        setAnchorEl(null);
      };
      const handleEditPost = (e) => {
        e.currentTarget.disabled = true;
        setAnchorEl(null);
        console.log("Edit post");
      };
      const handleDeletePost = (e) => {
        e.currentTarget.disabled = true;
        setAnchorEl(null);
        console.log("Delete post");
      };
        
      
      const upvoteHelper = (e) => {
        e.currentTarget.disabled = true;
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
        e.currentTarget.disabled = true;
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

    function clickCommentButton() {
      window.location.href = '/comments/' + Props.post._id;
    }

    return(
        <div className = "confessionPost">
              <div className = "confessionPostWrapper">
                <div className = "confessionPostEdit">
                  <div className = "confessionPostEditButton">
                    <Tooltip title="Options">
                      <IconButton 
                        id="edit-button" 
                        onClick={ handleOptionsClick } 
                        aria-controls={open ? 'edit-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        style={{
                            color: "#BABABA",
                      }}>
                        <MoreHorizIcon sx={{ fontSize: 40 }}/>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <Menu 
                    elevation={0}
                    id="edit-menu"
                    anchorEl={ anchorEl }
                    open={ open }
                    onClose={ handleOptionsClose }
                    MenuListProps={{ 'aria-labelledby': 'edit-button' }}
                  >
                    <MenuItem elevation={0} onClick={ handleEditPost }>
                      <ListItemIcon>
                        <EditIcon sx={{ fontSize: 25 }}/>
                      </ListItemIcon>
                      <ListItemText>Edit Confession</ListItemText>
                    </MenuItem>
                    <MenuItem elevation={0} onClick={ handleDeletePost }>
                      <ListItemIcon>
                        <DeleteIcon sx={{ fontSize: 25 }}/>
                      </ListItemIcon>
                      <ListItemText>Delete Confession</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
                
                <div className='confessionText'>
                    {Props.post.confession}
                </div>

                <div className= 'confessionVotesComments'>
                  <div className = 'votes'>
                    <Tooltip title="Upvote">
                      <IconButton value={Props.post._id} onClick={ upvoteHelper } sx={{
                          color: "#BABABA",
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
                          color: "#BABABA"
                        }}>
                          <KeyboardArrowDownIcon sx={{ fontSize: 50 }}/>
                      </IconButton>
                    </Tooltip>
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

  export default ConfessionPost;