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
    //icon image locations
    const upvote = 'https://github.com/kylekww/cop-4331-mern-project/blob/main/mobile/assets/up-arrow.png?raw=true';
    const downvote = 'https://github.com/kylekww/cop-4331-mern-project/blob/main/mobile/assets/down-arrow.png?raw=true';
    //accesible array of image locations
    const iconType = [upvote,downvote]

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
        maxWidth: 432,
        maxHeight: 432,
        width: '100%',
        height: '100%',
    },
});