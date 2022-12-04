import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

export default function GoBackButton(Props) 
{
    const newButtonColor = ['#000000', '#111111'];

    const handleClick = () => {
        alert("Taking you back to LandingPage");
    }

    return (
        <View>
            <TouchableOpacity onPress={handleClick} style={[styles.button, {backgroundColor: newButtonColor[(Props.isNew?1:0)]}]}>
                <Text style={styles.text}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    // goback: {
    //     alignSelf: 'center',
    //     width: '90%',
    //     height: '10%',
    //     backgroundColor: '#fff',
    //     padding: 10,
    //     borderRadius: 20,
    //     borderWidth: 5,
    //     borderColor: '#000000',
    //     top: '90%'
    // },
    button: {
        padding: 10,
        top: 5,
        bottom: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        //flexWrap: 'wrap',
        borderRadius: 30,
        borderWidth: 5,
        width: '50%',
        height: 50,
        marginVertical: 10
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'white'
    }
});