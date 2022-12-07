//my Replies file should be the same as CommentPost from frontend - correct?

import React, { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import searchComments from './searchComments';
import Icons from '../Icons';

export default function Replies(Props)
{
    const confessionOID = Props._id;
    const[searchVal, setSearch] = useState(2);
    const[commentoid, setCommentOid] = useState('');

    const {post, wasLastList} = searchComments(searchVal, commentoid, confessionOID);

    const buttonRef = useRef(null);
    const [count, setCount] = useState(0);

  const upvoteHelper = (val) => {
    //buttonRef.current.disabled = true;
    let id = val._id;
    let deleted = (val.deleted != 0 ? true:false);
    let vote = (val.netVotes);
    let interacted = (val.userInteracted);
    if(deleted) return null
    upvoteConfession(id);
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
    //buttonRef.current.disabled = true;
    let id = val._id;
    let deleted = (val.deleted != 0 ? true:false);
    let vote = val.netVotes;
    let interacted = val.userInteracted;
    downvoteConfession(id);
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
    setCount(0);
    Props.isNew ? setSearch(1) : setSearch(2);
    //setRefreshing(false);
  }, [Props.isNew]);

    const [tempData, setData] = useState([
        {name: 'Jacob', username: 'test1', id: 1},
        {name: 'Austin', username: 'test1', id: 2},
        {name: 'Joshua no G', username: 'test1', id: 3},
        {name: 'Joshua yes G', username: 'test1', id: 4},
        {name: 'Marco', username: 'test1', id: 5},
        {name: 'Ewrick', username: 'test1', id: 6},
    ]);

    const pressHandler = (key) => {
        //console.log(key);
    }

    return (
        <View style={styles.comment}>
            <View style={styles.commentFeed}>
                <View style={styles.commentFeedWrapper}>
                    <FlatList
                        keyExtractor={(item) => item._id}
                        data={post}
                        renderItem={({ item }) => (
                            <View style={styles.box}>
                                <TouchableOpacity onPress={pressHandler}>
                                    <Text style={styles.text}>
                                        {item.comment}
                                    </Text>
                                    <View style = {[styles.rowSpace,{marginTop:10}]}>
                                        
                                        <View style = {{top: 0, alignSelf: 'center'}}>
                                            <TouchableOpacity onPress={()=>{upvoteHelper(item)}}>
                                                <Icons style = {'upvote'}
                                                    height = {30} width = {30}
                                                    color = {Props.isNew?'blue':'red'}
                                                />
                                            </TouchableOpacity>
                                            <Text style = {styles.text}>{item.netVotes}</Text>
                                            <TouchableOpacity onPress={()=>{downvoteHelper(item)}}>
                                                <Icons style = {'downvote'}
                                                    height = {30} width = {30}
                                                    color = {Props.isNew?'blue':'red'}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        {/* <View>
                                            <View style={{height:30,width:30, flex:1}}>
                                                <TouchableOpacity ref={buttonRef} onPress={()=>{handleDeletePost(item)}}>
                                                {item.userCreated && (
                                                    <Icons style = {'delete'}
                                                    height = {30} width = {30}
                                                />
                                                )}
                                                </TouchableOpacity>
                                            </View>
                                        </View> */}
                                        {/* <View style={{top: 1, alignSelf: 'center'}}>
                                            <Text>Test</Text>
                                        </View> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

async function upvoteConfession(id) {
    const vote = 1;
    const type = 2;
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
    const type = 2;
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

//   async function deleteConfession(id){
//   const data = await fetch("https://hushucf.herokuapp.com/api/v1/confessions/deleteConfession", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id
//     }),
//   })
//   .then(res => {
//     res.json().then((data) => {
        
//       console.log(data);
//     }) 
//   })
//   .catch(err => {
//     console.log(err);
//   });
// }

const styles = StyleSheet.create({
    comment: {
        flex: 1
    },
    commentFeed: {
        flex: 5.5
    },
    commentFeedWrapper: {
        flexDirection: 'column',
        marginTop: '5%',
        height: '90%',
        width: '100%',
        position: 'fixed'
    },
    box: {
        margin: 5,
        position: 'relative',
        alignSelf: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        padding: 10,
        borderRadius: 30,
        borderWidth: 5,
        minHeight: 50,
        maxHeight: 500,
        width: '80%',
        backgroundColor: '#e7e8fe'
    },
    text: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontSize: 20,
        color: '#000000',
        justifyContent: 'center'
        //color: 'rgba(89, 35, 206, 1)'
    },
    rowSpace: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft:10,
    },
});