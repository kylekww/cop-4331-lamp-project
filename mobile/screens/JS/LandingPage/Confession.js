import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View , FlatList, StyleSheet, Text } from 'react-native';
import Icons from '../Icons';

import searchConfessions from './searchConfessions';

export default function Confession(Props) {
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
  }, [Props.isNew]);

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

  //const[vote, setVote] = useState(post.voteID.netVotes);
  //const[interacted, setInteracted] = useState(post.userInteracted)
  
  //console.log(isNew._currentValue)
  const handleOptionsClick = (event) => {
    event.currentTarget.disabled = true;
    setAnchorEl(event.currentTarget);
  };
  const handleOptionsClose = () => {
    setAnchorEl(null);
  };
  const handleEditPost = (e) => {
    //if(deleted) return null
    e.currentTarget.disabled = true;
    setAnchorEl(null);
    
    console.log("Edit post");
  };
  const handleDeletePost = (e) => {
    //if(deleted) return null
    e.currentTarget.disabled = true;
    setAnchorEl(null);
    deleteConfession(Props.post._id)
    setDeleted(true)
    console.log("Delete post");
  }; 
      
  const upvoteHelper = (e) => {
    e.currentTarget.disabled = true;
    //if(deleted) return null
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
    //if(deleted) return null
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
    //window.location.href = '/comments/' + Props.post._id;
  }
  
  const [tempData, setData] = useState([
    {name: 'Austin', username: 'test1', id: 1},
    {name: 'Austin', username: 'test1', id: 2},
    {name: 'Austin', username: 'test1', id: 3},
    {name: 'Austin', username: 'test1', id: 4},
    {name: 'Austin', username: 'test1', id: 5},
    {name: 'Austin', username: 'test1', id: 6},
    {name: 'Austin', username: 'test1', id: 7},

  ]);

  const pressHandler = (key) => {
    //console.log(key);
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
                    <View style={styles.columnSpace}>
                      <Text style = {styles.text}>hi, this is item  {item.id}, the name is {item.name} 
                      </Text>
                      <View style = {styles.rowSpace}>
                        <TouchableOpacity onPress={pressHandler}>
                          <Text style = {styles.text}>delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pressHandler}>
                          <Text style = {styles.text}>edit</Text>
                        </TouchableOpacity>
                        <View style = {styles.rowSpace}>
                          <TouchableOpacity onPress={pressHandler}>
                          <Icons style = {'downvote'}
                            height = {30} width = {30}
                            />
                          </TouchableOpacity>
                          <Text style = {styles.text}>0</Text>
                          <TouchableOpacity onPress={pressHandler}>
                            <Icons style = {'upvote'}
                            height = {30} width = {30}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
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

async function upvoteConfession(id) {
  const vote = 1;
  const type = 1;
  const data = await fetch("https://hushucf.herokuapp.com/api/v1/votes/changeVote", {
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
      //console.log(data);
    }) 
  })
  .catch(err => {
    //console.log(err);
  });
  
}

async function downvoteConfession(id) {
  const vote = -1;
  const type = 1;
  const data = await fetch("https://hushucf.herokuapp.com/api/v1/votes/changeVote", {
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
      //console.log(data);
    }) 
  })
  .catch(err => {
    //console.log(err);
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
    flexDirection: 'column',
    marginTop: '5%',
    height: '90%',
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
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnSpace: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});