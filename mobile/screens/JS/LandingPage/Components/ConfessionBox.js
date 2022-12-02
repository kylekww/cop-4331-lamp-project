import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View , FlatList, StyleSheet, Text, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Confession({itemid, pressHandler }) {
    console.log(itemid);
    return (
        <View style = {styles.box} >
            <TouchableOpacity onPress={pressHandler}>
                <Text style = {styles.text}>hi {itemid.id}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        margin: 5,
        position: 'relative',
        alignSelf: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        minHeight: '70%',
        maxHeight: 100,
        width: '80%',
        backgroundColor: 'rgb(231, 232, 243)', 
    },
    text: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontSize: 30,
        color: 'rgba(89,35,206,1)',
    },
});