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
import ConfessionPost from './ConfessionPost';
import { compose } from '@mui/system';
function Confession(Props) {
  // Post info
  const[searchVal, setSearch] = useState(1);
  const[oid, setOid] = useState('');
  const {post, wasLastList} = searchConfessions(searchVal, oid);

  
  //changes from hot/new vice versa
  useEffect(() => {
    post.length = 0;
    Props.isNew ? setSearch(1) : setSearch(2)
  }, [Props.isNew])
  
  //const[post, setPost] = useState([]);
  //const[length, setLength] = useState(15);

  // Edit menu logic
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleScroll = (e) => {
    const bottom = Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if(bottom && !wasLastList){
      if(post.length - 1 < 0){
        console.log('we must set oid to neutral')
        setOid('');
      }
      console.log(post[post.length - 1]._id)
      setOid(post[post.length - 1]._id);
    }
  }
  
  return (
    
    <div className = "confession">
        <div className = "confessionFeed">
          <div className= "confessionFeedWrapper" onScroll={handleScroll}>
          {post.map((posts) => ( 
            <ConfessionPost post = {posts} />
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
export default Confession;