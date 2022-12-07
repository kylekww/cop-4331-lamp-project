import React, { useState } from 'react';
import { StyleSheet, Image, Button, View, Text } from 'react-native';

export default function Logo(Props) {
    const style = Props.style;
    const height = Props.height;
    const width = Props.width;

    //map of possible icon types
    const iconMap = new Map();
    iconMap.set('upvote',0);
    iconMap.set('downvote',1);
    iconMap.set('delete',2);
    iconMap.set('comment',3);
    //icon image locations
    const upvote = 'https://raw.githubusercontent.com/kylekww/cop-4331-mern-project/main/mobile/assets/up-arrow.webp';
    const downvote = 'https://raw.githubusercontent.com/kylekww/cop-4331-mern-project/main/mobile/assets/down-arrow.webp';
    const deleteIcon = 'https://github.com/kylekww/cop-4331-mern-project/blob/main/mobile/assets/delete.png?raw=true';
    const comment = 'https://raw.githubusercontent.com/kylekww/cop-4331-mern-project/main/mobile/assets/comment.webp';
    //accesible array of image locations
    const iconType = [upvote,downvote,deleteIcon,comment]

    return (
        <View style = {[{height: height},{width: width}]}>
            <Image
                style={styles.logo}
                source={{uri:(iconType[iconMap.get(style)]),}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        maxWidth: 256,
        maxHeight: 256,
        width: '100%',
        height: '100%',
    },
});