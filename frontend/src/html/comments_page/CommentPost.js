import '../../css/styles.css';
import React, { useState } from "react";
import { MenuItem, Menu, ListItemIcon, ListItemText, Badge, Tooltip, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
function ConfessionPost(Props) {
    const[vote, setVote] = useState(Props.post.voteID.netVotes);
    const[interacted, setInteracted] = useState(Props.post.userInteracted)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

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
      const handleDeletePost = () => {
        setAnchorEl(null);
        console.log("Delete post");
      };
        
      
      const upvoteHelper = (e) => {
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
                      <ListItemText>Edit Comment</ListItemText>
                    </MenuItem>
                    <MenuItem elevation={0} onClick={ handleDeletePost }>
                      <ListItemIcon>
                        <DeleteIcon sx={{ fontSize: 25 }}/>
                      </ListItemIcon>
                      <ListItemText>Delete Comment</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
                
                <div className='confessionText'>
                    {Props.post.comment}
                </div>

                <div className= 'confessionVotesComments'>
                  <div className = 'votes'>
                    <Tooltip title="Upvote">
                      <IconButton value = {Props.post._id} onClick={ upvoteHelper } style={{
                          color: "#BABABA",
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
                          color: "#BABABA"
                        }}>
                          <KeyboardArrowDownIcon sx={{ fontSize: 50 }}/>
                      </IconButton>
                    </Tooltip>
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