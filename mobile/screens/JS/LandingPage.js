import React, { Component, useState } from 'react';
import { TouchableHighlight, StyleSheet, View, 
    Text, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Tools from './LandingPage/Tools';
import Header from './LandingPage/Header';
import NewConfessionButton from './LandingPage/NewConfessionButton';
import PageTip from './LandingPage/PageTip';
import Confession from './LandingPage/Confession';

export default function LandingPage() {

    const newButtonColor = ['rgba(128,199,239,1)','white'];
    const hotButtonColor = ['white','rgba(222,98,28,1)'];
    const [isNew, setIsNew] = useState([true]);
    const toggleIsNew = () => {
        setIsNew(current => !current);
    }
    const handleNewPageClick = async () => {
        if (isNew) {
            toggleIsNew;
        }
    }
    const handleHotPageClick = async () => {
        if (!isNew) {
            toggleIsNew;
        }
    }

    return (
        /*
        <View class="transitioncolor" style={{
            opacity: isNew ? '0' : '1',
            background: isNew ? 'transparent' : 'linear-gradient(180deg, rgba(238, 147, 114, 1) 0%, rgba(227, 19, 19, 0.921875) 100%) no-repeat fixed',
            backgroundSize: '100% auto',
            height: "100vh",
            width: "100%",
            margin: 0
            }}> 
        </View>
            <View class="transitioncolor" style={{
            opacity: isNew ? '0' : '1',
            background: isNew ? 'linear-gradient(180deg, rgba(238, 147, 114, 1) 0%, rgba(227, 19, 19, 0.921875) 100%) no-repeat fixed' : 'transparent',
            height: "100vh",
            width: "100%"
            }}> 
        </View>
        */
        /*
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(128,199,239,1)', 'rgba(89,35,206,1)']}
                style={styles.background}
            />
            <View style = {styles.workspace}>
                <View style={[styles.header,{alignSelf: 'left'}]}> 
                    <ProfileButton />
                    <View style={[styles.header,{alignSelf: 'center'}]}> 
                        <TouchableHighlight style={[styles.newButton,{backgroundColor:newButtonColor[(isHot)?1:0]}]} 
                            onPress={handleNewPageClick} underlayColor='rgb(128,199,239,0.75)'>
                            <Text style={[styles.buttonText,{color: newButtonColor[(!isHot)?1:0]}]}>New</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.hotButton,{backgroundColor:hotButtonColor[(isHot)?1:0]}]} 
                            onPress={handleHotPageClick} underlayColor='rgb(222,98,28,0.5)'>
                            <Text style={[styles.buttonText,{color: hotButtonColor[(!isHot)?1:0]}]}>Hot</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>

                </ScrollView>
            </View>
        </View>
        */
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={isNew?['rgba(128,199,239,1)', 'rgba(89,35,206,1)']:['#DE621C', 'rgba(227, 19, 19, 0.921875)']}
                style={styles.background}
            />
            
            <Tools isNew={isNew} toggleIsNew={toggleIsNew}></Tools>
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
        position: 'relative',
        justifyContent: 'center',
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