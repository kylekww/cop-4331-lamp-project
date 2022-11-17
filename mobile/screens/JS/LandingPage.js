import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, TextInput, Button, View, 
    Text, Alert, RefreshControl, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
                <View style={styles.header}> 

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
    button: {
        padding: 15,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        width: 250,
        backgroundColor: 'rgba(89,35,206,1)',
    },
    buttonText:{
        fontSize: 30,
        color: 'rgba(128,199,239,1)',
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
    text2: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
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
    squarebg: {
        padding: 5,
        maxWidth: '90%',
        width: 400,
        height: 650,
        backgroundColor: 'rgb(231, 232, 243)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'transparent',
      },
    header: {
        flexDirection: 'row',
    }
});