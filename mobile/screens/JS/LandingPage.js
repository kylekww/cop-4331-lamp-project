import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, TextInput, Button, View, 
    Text, Alert, RefreshControl, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

global.nickname = 'T';
global.profileColor = 'rgba(89,35,206,1)';
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
                <View style={[styles.header,{shadowOffset: {
            width: 0,
            height: 5
          },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowColor: 'black',}]}> 
                    <TouchableHighlight style={[styles.profileButton,{backgroundColor: global.profileColor}]} onPress={this.handleProfile} underlayColor='rgb(60, 23, 141)'>
                        <Text style={styles.buttonText}>{global.nickname}</Text>
                    </TouchableHighlight>
                    <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(90, 170, 216, 0.0701908)', 'rgba(70, 24, 203, 0.921875)']}
                    style={styles.newButton}>
                        <TouchableHighlight style={styles.specialButtonClickable} onPress={this.handleNewPage} underlayColor='rgb(60, 23, 141)'>
                            <Text style={[styles.buttonText,{color: 'black'}]}>New</Text>
                        </TouchableHighlight>
                    </LinearGradient>
                    <LinearGradient
                    // Background Linear Gradient
                    colors={['white', '#DE621C']}
                    style={styles.hotButton}>
                        <TouchableHighlight style={styles.specialButtonClickable} onPress={this.handleHotPage} underlayColor='rgb(60, 23, 141)'>
                            <Text style={[styles.buttonText,{color: 'black'}]}>Hot</Text>
                        </TouchableHighlight>
                    </LinearGradient>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        centerContent:true,
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
        alignSelf: 'left',
        borderWidth: 1,
        borderRadius: 60,
        width: 60,
        height: 60,
    },
    newButton: {
        margin: 15,
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'rgba(70, 24, 203, 0.921875)',
        borderWidth: 2,
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
        borderColor: '#DE621C',
        borderWidth: 2,
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
        justifyContent: 'space-between',
    }
});