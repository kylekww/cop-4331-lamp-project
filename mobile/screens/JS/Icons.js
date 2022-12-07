import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default function Logo(Props) {
    const style = Props.style;
    const height = Props.height;
    const width = Props.width;
    const color = Props.color;

    return (
        <View style = {[{height: height, width: width}]}>
            <Image
                style={[styles.logo,{tintColor: color}]}
                source={{uri:images.icons[style],}}
            />
        </View>
    )
}
const images = {
    icons: {
        'upvote' : 'https://raw.githubusercontent.com/kylekww/cop-4331-mern-project/main/mobile/assets/up-arrow.webp',
        'downvote' :'https://raw.githubusercontent.com/kylekww/cop-4331-mern-project/main/mobile/assets/down-arrow.webp',
        'delete' : 'https://github.com/kylekww/cop-4331-mern-project/blob/main/mobile/assets/delete.png?raw=true',
        'comment' : 'https://raw.githubusercontent.com/kylekww/cop-4331-mern-project/main/mobile/assets/comment.webp',
    }
};

const styles = StyleSheet.create({
    logo: {
        maxWidth: 256,
        maxHeight: 256,
        width: '100%',
        height: '100%',
    },
});