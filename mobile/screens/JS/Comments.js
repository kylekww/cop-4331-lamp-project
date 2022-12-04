import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Confession from './Comments/Confession';
import NewCommentButton from './Comments/NewCommentButton';
import searchComments from './Comments/searchComments';
import GoBackButton from './Comments/GoBackButton';
import Replies from './Comments/Replies';

export default function Comments()
{
    //Comment indo
    const[searchVal, setSearch] = useState(1);
    const[oid, setOid] = useState('');
    //const {post, wasLastList} = searchComments(searchVal, oid);
    //changes from hot/new vice versa

    //Edit menu logic
    const [anchorE1, setAnchorE1] = React.useState(null);
    const open = Boolean(anchorE1);

    const handleScroll = (e) => {
        const bottom = Math.rounf(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        if(bottom && !wasLastList){
            if(post.length -1 < 0){
                //console.log('we must set oid to neutral');
                setOid('');
            }
            //console.log(post[post.length - 1]._id);
            setOid(post[post.length - 1]._id);
        }
    }

    const goBack = (event) => {

    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#80c6ef', '#5923ce']}
                style={styles.background}
            />

            <View>
                <GoBackButton></GoBackButton>
            </View>

            <Confession></Confession>
            <Replies></Replies>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        zIndex: 0
    }
});