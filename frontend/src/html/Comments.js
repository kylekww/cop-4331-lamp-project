import '../css/styles.css';
import React, {useEffect, useState} from 'react';
import Confession from './comments_page/Confession';
import NewCommentButton from './comments_page/NewCommentButton';
import searchComments from './comments_page/searchComments';
import { useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip, IconButton } from '@mui/material';
import ProfileButton from './landing_page/ProfileButton';

function Comments() {
  // Comment info
  const[searchVal, setSearch] = useState(1);
  const[oid, setOid] = useState('');
  const {post, wasLastList} = searchComments(searchVal, oid);
  //changes from hot/new vice versa

  // Edit menu logic
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleScroll = (e) => {
    const bottom = Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if(bottom && !wasLastList){
      if(post.length - 1 < 0){
        //console.log('we must set oid to neutral')
        setOid('');
      }
      //console.log(post[post.length - 1]._id)
      setOid(post[post.length - 1]._id);
    }
  }

  const goBack = (event) => {
    window.location.href = '/landing';
  };

  return (
    <div class="commentsPage">
      <div class="commentsPageTopBar">
        <ProfileButton />
        <div class="CommentsReturnButtonWrapper">
          <Tooltip title="Return">
            <IconButton onClick={ goBack } class="CommentReturnButton NewColorInverted" style={{
              color: "#FFFFFF",
            }}>
              <ArrowBackIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
        </div>
        <div>
        <img src={require('../images/NewIcon.jpg')} class="HushIconComments" />
        </div>
      </div>
      <Confession oid={useParams().token}/>
      <NewCommentButton oid={useParams().token}/>
    </div>
  );
}

export default Comments;