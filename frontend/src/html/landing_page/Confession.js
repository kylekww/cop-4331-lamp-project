import '../../css/styles.css';
import React, { useState, useEffect } from 'react';
import searchConfessions from './searchConfessions';
import ConfessionPost from './ConfessionPost';
function Confession(Props) {
  // Post info
  const[searchVal, setSearch] = useState(1);
  const[oid, setOid] = useState('');
  const {post, wasLastList} = searchConfessions(searchVal, oid);
  const[isNew, setIsNew] = useState(!Props.isNew);
  //changes from hot/new vice versa
  useEffect(() => {
    post.length = 0;
    setIsNew(current => !current);
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
        //console.log('we must set oid to neutral')
        setOid('');
      }
      //console.log(post[post.length - 1]._id)
      setOid(post[post.length - 1]._id);
    }
  }
  
  return (
    
    <div className = "confession">
        <div className = "confessionFeed">
          <div className= "confessionFeedWrapper" onScroll={handleScroll}>
          {post.map((posts) => ( 
            <ConfessionPost isNew = {isNew} post = {posts} />
            ))}
          </div>
        </div> 
    </div> 
  );
}
export default Confession;