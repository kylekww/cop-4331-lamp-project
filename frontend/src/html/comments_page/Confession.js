import '../../css/styles.css';
import React, { useState, useEffect, MouseEvent, useRef, useCallback } from 'react';
import { MenuItem, Menu, ListItemIcon, ListItemText, Badge, Tooltip, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import searchComments from './searchComments';

function Confession(Props) {

  // Get the confession
  const oid = Props.oid;
  console.log(oid);
  const[searchVal, setSearch] = useState(1);
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
        setConfession(data[0]);
        console.log(data);
        console.log(data[0]);
      })
    })
    .catch(err => {
      console.log(err);
    })}, []);

  
  const[commentoid, commentsetOid] = useState('');
  const{
    post,
    length
  } = searchComments(searchVal, oid);
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

  // Comment scroll
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if(bottom){
      commentsetOid(post[length - 1]._id);
    }
  }
  const upvoteHelper = (e) => {
    upvoteComment(e.currentTarget.value);
  }

  const downvoteHelper = (e) => {
    downvoteComment(e.currentTarget.value);
  }

  return (
    <>
    {/* Large confession */}
      <div class="largeConfessionContainer">
          <div class="largeConfession">
              <div class="largeConfessionText">
                  {confession.confession}
              </div>
          </div>
          <div class="commentsPageTip">
              Be careful... comments are signed by YOU!
              <element class="Line">
              </element>
          </div>
      </div>

      {/* Comments */}
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
                </div>
              </div>
            </div>
            ))}
          </div>
        </div> 
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