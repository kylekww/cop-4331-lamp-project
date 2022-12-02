import React, { Component, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Tools from './LandingPage/Tools';
import Header from './LandingPage/Header';
import NewConfessionButton from './LandingPage/NewConfessionButton';
import PageTip from './LandingPage/PageTip';
import Confession from './LandingPage/Confession';

export default function LandingPage(Props) {
    const [isNew, setIsNew] = useState([true]);
    const toggleIsNew = () => {
        setIsNew(current => !current);
    }
    const goToProfile = () => {
        console.log('doubleclick');
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={isNew?['rgba(128,199,239,1)', 'rgba(89,35,206,1)']:['#DE621C', 'rgba(227, 19, 19, 0.921875)']}
                style={styles.background}
            />
            <Tools isNew={isNew} toggleIsNew={toggleIsNew} goToProfile={goToProfile}></Tools>           
            <Header isNew={isNew}></Header>
            <PageTip></PageTip>
            <Confession isNew={isNew}></Confession>
            <NewConfessionButton isNew={isNew}></NewConfessionButton>
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    workspace: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'center',
    },
    scrollView: {
        centerContent: true,
        alignSelf: 'center',
        indicatorStyle: 'white',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        zIndex: 0,
    },
    newButton: {
        margin: 15,
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        borderColor: 'rgba(70, 24, 203, 0.9)',
        borderWidth: 6,
        borderRadius: 12,
        width: 80,
        height: 40,
    },
    hotButton: {
        margin: 15,
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        borderColor: 'rgba(167, 15, 15, 0.9)',
        borderWidth: 6,
        borderRadius: 12,
        width: 80,
        height: 40,
    },
    buttonText:{
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
    },
    button2: {
        justifyContent: 'space-between',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'rgba(89,35,206,1)',
        fontSize: 20,
    },
    text: {
        marginTop: 25,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontSize: 30,
        color: 'rgba(89,35,206,1)',
        margin: 10,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        width: 300,
        height: 50,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 5,
        fontSize: 24,
        color: 'rgba(89,35,206,1)',
        alignSelf: 'center',
        textAlign: 'left',
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    }
    /*,
    shadow: {
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowColor: 'black',
    }*/
});