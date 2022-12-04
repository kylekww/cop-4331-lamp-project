import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Confession(Props)
{
    return (
        <View style={styles.confession}>
            <Text style={{alignSelf: 'center'}}>byeeeeeee</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    confession: {
        alignSelf: 'center',
        width: '90%',
        height: '30%',
        backgroundColor: '#e7e8fe',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        borderWidth: 10,
        borderColor: '#000000',
        //top: '5%'
    }
});