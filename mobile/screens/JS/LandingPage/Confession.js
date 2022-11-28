import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View , FlatList, StyleSheet } from 'react-native';

import searchConfessions from './searchConfessions';
import ConfessionBox from './Components/ConfessionBox';

export default function Confession(Props) {
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
  
  const [tempData, setData] = useState([
    {name: 'Austin', username: 'test1', id: '1'},
  ]);

  return (
    
    <View style = {styles.confession}>
        <View style = {styles.confessionFeed}>
            <FlatList  
                data={tempData}
                renderItem={({ item }) => (
                    <ConfessionBox isNew={Props.isNew} item={item}></ConfessionBox>
                )}
            />
        </View> 
    </View> 
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
async function clickCommentButton() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  window.location.href = '/comments';
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

const styles = StyleSheet.create({
    confession: {
        flex: 1,
    },
    confessionFeed: {
        flex: 5.5,
    },
    confessionFeedWrapper: {
        padding: 20,
    flexDirection: 'column',
    flex: 1,
    height: 500,
    width: '100%',
    position: 'fixed',
    },
    text: {
        fontStyle: 'normal',
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#BABABA',
        //text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    },
});