import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View , FlatList, StyleSheet, Text } from 'react-native';

//import searchConfessions from './searchConfessions';
import ConfessionBox from './Components/ConfessionBox';

export default function Confession(Props) {
  // Post info
  const[searchVal, setSearch] = useState(1);
  /*useEffect(() => {
    Props.isNew ? setSearch(1) : setSearch(2)
    console.log(searchVal);
  }, [Props.isNew])*/
  const[oid, setOid] = useState('');
  /*const{
    post,
    length
  } = searchConfessions(searchVal, oid);
  const observer = useRef(); */
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
    {name: 'Austin', username: 'test1', id: 1},
    {name: 'Austin', username: 'test1', id: 2},
    {name: 'Austin', username: 'test1', id: 3},
    {name: 'Austin', username: 'test1', id: 4},
    {name: 'Austin', username: 'test1', id: 5},
    {name: 'Austin', username: 'test1', id: 6},
    {name: 'Austin', username: 'test1', id: 7},
    {name: 'Austin', username: 'test1', id: 1+7},
    {name: 'Austin', username: 'test1', id: 2+7},
    {name: 'Austin', username: 'test1', id: 3+7},
    {name: 'Austin', username: 'test1', id: 4+7},
    {name: 'Austin', username: 'test1', id: 5+7},
    {name: 'Austin', username: 'test1', id: 6+7},
    {name: 'Austin', username: 'test1', id: 7+7},
    {name: 'Austin', username: 'test1', id: 1+7+7},
    {name: 'Austin', username: 'test1', id: 2+7+7},
    {name: 'Austin', username: 'test1', id: 3+7+7},
    {name: 'Austin', username: 'test1', id: 4+7+7},
    {name: 'Austin', username: 'test1', id: 5+7+7},
    {name: 'Austin', username: 'test1', id: 6+7+7},
    {name: 'Austin', username: 'test1', id: 7+7+7},

  ]);

  const pressHandler = (key) => {
    console.log(key);
  }

  return (
    <View style = {styles.confession}>
        <View style = {styles.confessionFeed}>
          <View style = {styles.confessionFeedWrapper}>
            <FlatList  
                keyExtractor={(item) => item.id}
                data={tempData}
                renderItem={({ item }) => (
                  <View style = {styles.box} >
                    <TouchableOpacity onPress={pressHandler}>
                      <Text style = {styles.text}>hi, this is item  {item.id}, the name is {item.name} 
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
            />
          </View>
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
  box: {
    margin: 5,
    position: 'relative',
    alignSelf: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    minHeight: 50,
    maxHeight: 150,
    width: '80%',
    backgroundColor: 'rgb(231, 232, 243)', 
  },
  text1: {
    fontStyle: 'normal',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#BABABA',
    //text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  },
  text: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: 20,
    color: 'rgba(89,35,206,1)',
  },
});