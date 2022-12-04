//my Replies file should be the same as CommentPost from frontend - correct?

import React, { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import shit from a icon library

export default function Replies(Props)
{
    // const[vote, setVote] = useState(Props.post.netVotes);
    // const[interacted, setInteracted] = useState(Props.post.userInteracted);
    // const [anchorE1, setAnchorE1] = React.useState(null);
    // const open = Boolean(anchorE1);

    // const handleOptionsClick = (event) => {
    //     setAnchorE1(event.curretnTarget);
    // };
    // const handleOptionsClose = () => {
    //     setAnchorE1(null);
    // };
    // const handleEditPost = () => {
    //     setAnchorE1(null);
    //     console.log("Edit post");
    // };
    // const handleDeletePost = () => {
    //     setAnchorE1(null);
    //     console.log("delete post");
    // };

    // const upvoteHelper = (e) => {
    //     upvoteConfession(e.currentTarget.value);
    //     if(interacted == 1){
    //         console.log('this user was interacted before the upvote')
            
    //         setInteracted(0)
    //         setVote(vote - 1)
    //     } 
    //     if(interacted == 0){
    //         console.log('this user was not interacted before the upvote')
    //         setInteracted(1)
    //         setVote(vote + 1)
    //     }
    //     if(interacted == -1){
    //         console.log('downvoted before vote, now upvoted')
    //         setInteracted(1)
    //         setVote(vote + 2)
    //     }
    //   }
    
    // const downvoteHelper = (e) => {
    //     downvoteConfession(e.currentTarget.value);
    //     if(interacted == -1){
    //         console.log('downvoted before, now neutral')
    //         setInteracted(0)
    //         setVote(vote + 1)
    //     }
    //     if(interacted == 0){
    //         console.log('neutral to downvoted')
    //         setInteracted(-1)
    //         setVote(vote - 1)
    //     }
    //     if(interacted == 1){
    //         console.log('upvote to downvote')
    //         setInteracted(-1)
    //         setVote(vote - 2)
    //     }
    // }

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
                        keyExtractor={(item) => item.id}
                        data={tempData}
                        renderItem={({ item }) => (
                            <View style={styles.box}>
                                <TouchableOpacity onPress={pressHandler}>
                                    <Text style={styles.text}>
                                        hi, this is item {item.id}, and the name is {item.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

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
        maxHeight: 150,
        width: '80%',
        backgroundColor: '#e7e8fe'
    },
    text: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontSize: 20,
        color: '#000000'
        //color: 'rgba(89, 35, 206, 1)'
    }
});