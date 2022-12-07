import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View , FlatList, StyleSheet, Text, RefreshControl, Alert } from 'react-native';
import Icons from '../Icons';

import searchConfessions from './searchConfessions';

export default function Confession(Props) {
  const[refreshing,setRefreshing] = useState(true);
   // Post info
  const[searchVal, setSearch] = useState(1);
  const[oid, setOid] = useState('');
  const {post,wasLastList} = searchConfessions(searchVal, oid);
  const[isNew, setIsNew] = useState(Props.isNew);
   // button presses
  const buttonRef = useRef(null);
  const handleDeletePost = (val) => {
    buttonRef.current.disabled = true;
    id = val._id;
    deleted = val.deleted != 0 ? true:false;
    if(deleted) return null;
    deleteConfession(id);
    val.deleted = true;
    Alert.alert('Deleted Post');
    console.log("Delete post");
  }; 
  const upvoteHelper = (val) => {
    buttonRef.current.disabled = true;
    id = val._id;
    deleted = (val.deleted != 0 ? true:false);
    vote = (val.netVotes);
    interacted = (val.userInteracted);
    if(deleted) return null
    //upvoteConfession(id.value);
    if(interacted == 1){
      console.log('this user was interacted before the upvote'+id)
      val.interacted = 0;
      val.netVotes -= 1;
    } 
    if(interacted == 0){
      console.log('this user was not interacted before the upvote'+id)
      val.interacted = 1;
      val.netVotes += 1;
    }
    if(interacted == -1){
      console.log('downvoted before vote, now upvoted'+id)
      val.interacted = 1;
      val.netVotes += 2;
    }
  }
  const downvoteHelper = (val) => {
    buttonRef.current.disabled = true;
    id = val._id;
    deleted = (val.deleted != 0 ? true:false);
    vote = val.netVotes;
    interacted = val.userInteracted;
    //downvoteConfession(id.value);
    if(deleted) return null
    if(interacted == -1){
      console.log('downvoted before, now neutral'+id)
      val.interacted = 0;
      val.netVotes += 1;
    }
    if(interacted == 0){
      console.log('neutral to downvoted'+id)
      val.interacted = -1;
      val.netVotes -= 1;
    }
    if(interacted == 1){
      console.log('upvote to downvote'+id)
      val.interacted = -1;
      val.netVotes -= 2;
    }
  }
   const handleReset = event => {
    buttonRef.current.disabled = false;
   }

   //changes from hot/new vice versa
  useEffect(() => {
    post.length = 0;
    Props.isNew ? setSearch(1) : setSearch(2);
    setRefreshing(false);
  }, [Props.isNew]);

  const loadUserData = () => {
    Props.isNew ? setSearch(1) : setSearch(2);
    //setOid('');
    //{setPosts,setWasLastList}searchConfessions(searchVal, oid);
    //post.length = 0;
    setRefreshing(false);
  };
   // Edit menu logic
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  //const[vote, setVote] = useState(post.voteID.netVotes);
  //const[interacted, setInteracted] = useState(post.userInteracted)
  
  //console.log(isNew._currentValue)
  
  function clickCommentButton(val) {
    console.log(val._id);
    //window.location.href = '/comments/' + Props.post._id;
    if(val.deleted) return null;
  }

  function pressHandler() {
    //window.location.href = '/comments/' + Props.post._id;
  }

  const GoToComments = async () => 
  {
    Props.navigation.push('CommentsPage');
  }

  return (
    <View style = {styles.confession}>
        <View style = {styles.confessionFeed}>
          <View style = {styles.confessionFeedWrapper}>
            <FlatList  
                keyExtractor={(item) => item._id}
                data={post}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={loadUserData}/>
                }
                renderItem={({ item }) => (
                  <View style = {styles.box} >
                    <View style={styles.columnSpace}>
                      <View style = {{flexWrap: 'wrap', maxHeight: 250}}>
                        <Text style = {styles.text}>{item.confession}</Text>
                      </View>
                      <View style = {[styles.rowSpace,{marginTop:10}]}>
                        <View style={{height:30,width:30}}>
                          <TouchableOpacity ref={buttonRef} onPress={()=>{handleDeletePost(item)}}>
                            {item.userCreated && (
                              <Icons style = {'delete'}
                              height = {30} width = {30}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View style = {{left:10}}>
                          <TouchableOpacity onPress={GoToComments}>
                            <Icons style = {'comment'}
                                height = {30} width = {30}
                                />
                          </TouchableOpacity>
                        </View>
                        <View style = {[styles.rowSpace,{right:10}]}>
                          <TouchableOpacity onPress={()=>{downvoteHelper(item)}}>
                          <Icons style = {'downvote'}
                            height = {30} width = {30}
                            />
                          </TouchableOpacity>
                          <Text style = {styles.text}>{item.netVotes}</Text>
                          <TouchableOpacity onPress={()=>{upvoteHelper(item)}}>
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
    console.log(err);
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
    console.log(err);
  });
}

async function deleteConfession(id){
  const data = await fetch("https://hushucf.herokuapp.com/api/v1/confessions/deleteConfession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    minHeight: 50,
    maxHeight: 300,
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
    marginLeft:10,
  },
  columnSpace: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});