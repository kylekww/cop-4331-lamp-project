import React, { useState } from 'react';
import { StyleSheet, Image, Button, View, Text } from 'react-native';

export default function Logo(Props) {
    const newIcon = 'https://github.com/kylekww/cop-4331-mern-project/blob/main/mobile/assets/NewIcon.jpg?raw=true';
    const hotIcon = 'https://github.com/kylekww/cop-4331-mern-project/blob/main/mobile/assets/HotIcon.jpg?raw=true';

    return (
        <View>
            <Image
                style={styles.logo}
                source={{uri:(Props.isNew?newIcon:hotIcon),}}
            />
        </View>
    )
}

//width: 432,
//height: 432,
const styles = StyleSheet.create({
    logo: {
        maxWidth: 432,
        maxHeight: 432,
        width: '100%',
        height: '100%',
    },
});