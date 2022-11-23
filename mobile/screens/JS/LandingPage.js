import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, TextInput, Button, View, 
    Text, Alert, RefreshControl, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

global.nickname = 'T';
global.profileColor = 'rgba(89,35,206,1)';
global.viewMode = 1;
global.newButtonColor = ['rgba(128,199,239,0.5)','white'];
global.hotButtonColor = ['white','rgba(222,98,28,0.5)'];

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
                
                <View style={[styles.header,{alignSelf: 'left'}]}> 
                    <TouchableHighlight style={[styles.profileButton,{backgroundColor: global.profileColor}]} onPress={this.handleProfile} underlayColor='rgb(60, 23, 141)'>
                        <Text style={styles.buttonText}>{global.nickname}</Text>
                    </TouchableHighlight>
                    <View style={[styles.header,{alignSelf: 'center'}]}> 
                        <TouchableHighlight style={[styles.specialButtonClickable,{backgroundColor:newButtonColor[viewMode]}]} 
                            onPress={this.handleNewPage} underlayColor='rgb(128,199,239,0.75)'>
                            <Text style={[styles.buttonText,{color: 'black'}]}>New</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.specialButtonClickable,{backgroundColor:hotButtonColor[viewMode]}]} 
                            onPress={this.handleHotPage} underlayColor='rgb(222,98,28,0.5)'>
                            <Text style={[styles.buttonText,{color: 'black'}]}>Hot</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>

                </ScrollView>
            </View>
        )
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
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
        borderColor: 'rgba(70, 24, 203, 0.9)',
        borderWidth: 10,
        borderRadius: 20,
        width: 80,
        height: 40,
    },
    specialButtonClickable: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        width: 80,
        height: 40,
    },
    hotButton: {
        margin: 15,
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'rgba(167, 15, 15, 0.9)',
        borderWidth: 10,
        borderRadius: 20,
        width: 80,
        height: 40,
    },
    buttonText:{
        fontSize: 30,
        color: 'white',
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
        margin: 10,
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