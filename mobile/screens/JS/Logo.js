import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Text } from 'react-native';

export default function Logo() {

    return (
        <View>
            <Image
                style={styles.logo}
                source={{uri:'https://github.com/kylekww/cop-4331-mern-project/blob/main/mobile/assets/HotIcon.jpg',}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 432,
        height: 432,
    },
});