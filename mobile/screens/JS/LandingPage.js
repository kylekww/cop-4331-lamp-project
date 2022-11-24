import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, TextInput, Button, View, 
    Text, Alert, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

global.nickname = 'T';
global.profileColor = 'rgba(89,35,206,1)';
global.viewMode = 0;
const newButtonColor = ['rgba(128,199,239,1)','white'];
const hotButtonColor = ['white','rgba(222,98,28,1)'];

/*
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
}, []);
*/
export default class LandingPage extends Component {
    constructor()
    {
        super()
        this.state = 
        {
            message: ''
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(128,199,239,1)', 'rgba(89,35,206,1)']}
                    style={styles.background}
                />
                <View style = {styles.workspace}>
                    <View style={[styles.header,{alignSelf: 'left'}]}> 
                        <TouchableHighlight style={[styles.profileButton,{backgroundColor: global.profileColor}]} onPress={this.handleProfile} underlayColor='rgb(60, 23, 141)'>
                            <Text style={styles.buttonText}>{global.nickname}</Text>
                        </TouchableHighlight>
                        <View style={[styles.header,{alignSelf: 'center'}]}> 
                            <TouchableHighlight style={[styles.newButton,{backgroundColor:newButtonColor[global.viewMode]}]} 
                                onPress={this.handleNewPageClick} underlayColor='rgb(128,199,239,0.75)'>
                                <Text style={[styles.buttonText,{color: newButtonColor[(!global.viewMode)?1:0]}]}>New</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.hotButton,{backgroundColor:hotButtonColor[global.viewMode]}]} 
                                onPress={this.handleHotPageClick} underlayColor='rgb(222,98,28,0.5)'>
                                <Text style={[styles.buttonText,{color: hotButtonColor[(!global.viewMode)?1:0]}]}>Hot</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <ScrollView style={styles.scrollView}>

                    </ScrollView>
                </View>
            </View>
        )
    }

    handleNewPageClick = async () => {
        global.viewMode = 0;
    }
    handleHotPageClick = async () => {
        global.viewMode = 1;
    }
}

styles = StyleSheet.create({
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
    profileButton: {
        padding: 10,
        margin: 10,
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 60,
        width: 60,
        height: 60,
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
        flexWrap: 'wrap',
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