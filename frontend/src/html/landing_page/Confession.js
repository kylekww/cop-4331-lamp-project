import '../../css/styles.css';
import React, { useState, useEffect, MouseEvent, useRef, useCallback } from 'react';
import { MenuItem, Menu, ListItemIcon, ListItemText, Badge, Tooltip, IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import searchConfessions from './searchConfessions';
function Confession(Props) {
  // Post info
  const[searchVal, setSearch] = useState(1);
  /*useEffect(() => {
    Props.isNew ? setSearch(1) : setSearch(2)
    console.log(searchVal);
  }, [Props.isNew])*/
  const[oid, setOid] = useState('');
  const{
    post,
    length
  } = searchConfessions(searchVal, oid);
  
  const observer = useRef();
  //const[post, setPost] = useState([]);
  //const[length, setLength] = useState(15);

  // Edit menu logic
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
  const handleScroll = (e) => {
    
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if(bottom){
      setOid(post[length - 1]._id);
      
    }
    
  }
  const upvoteHelper = (e) => {
    upvoteConfession(e.currentTarget.value);
  }

  const downvoteHelper = (e) => {
    downvoteConfession(e.currentTarget.value);
  }
  // React hook for confessions
  
  
  return (
    
    <div className = "confession">
        <div className = "confessionFeed">

          <div className= "confessionFeedWrapper" onScroll={handleScroll} ref = {observer}>
          {post.map(posts => ( 
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
                    {posts.confession}
                </div>

                <div className= 'confessionVotesComments'>
                  <div className = 'votes'>
                    <Tooltip title="Upvote">
                      <IconButton value = {posts._id} onClick={ upvoteHelper } style={{
                          color: "#BABABA",
                        }}>
                          <KeyboardArrowUpIcon sx={{ fontSize: 50 }}/>
                      </IconButton>
                    </Tooltip>
                    <Badge badgeContent={1000} max={999} sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: Props.isNew ? "#463bdd" : "rgba(207, 15, 15, 0.9)",
                        color: "white",
                        fontSize: 20,
                        height: 30
                    }}}>
                    </Badge>
                    <Tooltip title="Downvote">
                      <IconButton value = {posts._id} onClick={ downvoteHelper } style={{
                          color: "#BABABA"
                        }}>
                          <KeyboardArrowDownIcon sx={{ fontSize: 50 }}/>
                      </IconButton>
                    </Tooltip>
                  </div>

                  <div className='comments'>
                    <Badge badgeContent={100} max={99} sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: Props.isNew ? "#463bdd" : "rgba(207, 15, 15, 0.9)",
                        color: "white"
                    }}}>
                      <Tooltip title="Add Comment">
                        <IconButton onClick={ () => clickCommentButton(posts._id) } style={{
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
async function clickCommentButton(value) {
  window.location.href = '/comments/' + value;
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

export default Confession;