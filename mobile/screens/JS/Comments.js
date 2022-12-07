import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Confession from './Comments/Confession';
import NewCommentButton from './Comments/NewCommentButton';
import GoBackButton from './Comments/GoBackButton';
import Replies from './Comments/Replies';

export default function Comments(Props)
{
    //Comment indo
    const[searchVal, setSearch] = useState(1);
    const[oid, setOid] = useState('');
    const isNew = Props.navigation.state.params.isNew;
    const _id = Props.navigation.state.params.id;

    //Edit menu logic
    // const [anchorE1, setAnchorE1] = React.useState(null);
    // const open = Boolean(anchorE1);

    // const handleScroll = (e) => {
    //     const bottom = Math.rounf(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    //     if(bottom && !wasLastList){
    //         if(post.length -1 < 0){
    //             //console.log('we must set oid to neutral');
    //             setOid('');
    //         }
    //         //console.log(post[post.length - 1]._id);
    //         setOid(post[post.length - 1]._id);
    //     }
    // }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={isNew?['rgba(128,199,239,1)', 'rgba(89,35,206,1)']:['#de621c', 'rgba(227,19,19,0.921875)']}
                style={styles.background}
            />

            <View>
                <GoBackButton navigation={Props.navigation}></GoBackButton>
            </View>

            <Confession _id={_id}></Confession>
            <Replies _id={_id}></Replies>
            <NewCommentButton isNew={isNew} _id={_id}></NewCommentButton>
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