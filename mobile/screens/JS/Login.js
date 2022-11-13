import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableHighlight } from 'react-native-gesture-handler';

global.firstName = '';
global.userName = '';
global.email = '';
global.password = '';
global.localName = '';
global.userId = -1;
global.lastName = '';
global.search = '';
global.card = '';

export default class Registrationscreen extends Component {

    constructor() 
    {
      super()
      this.state = 
      {
         message: ' '
      }
    }

    render(){
        return(
            <View style={styles.container}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(128,199,239,1)', 'rgba(89,35,206,1)']}
                    style={styles.background}
                    />
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.text}>Logo goes here </Text>
                    <View style={{alignItems: 'flex-end'}}>
                        <View style={styles.squarebg}>
                            <Text style={styles.text}> Make your confessions...</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                onChangeText={(val) => { this.changeUserNameHandler(val) }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(val) => { this.changePasswordHandler(val) }}
                            />
                            <TouchableHighlight style={styles.button} onPress={this.handleRegister} underlayColor='rgb(60, 23, 141)'>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableHighlight>
                            <Text style={styles.text2}> Don't have an account? </Text>
                            <TouchableOpacity 
                                style={styles.button2}
                                onPress={this.handleReturn}>
                                <Text style={styles.button2}> Signup!</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.text,{color:'white'}]}>{this.state.message} </Text>
                    </View>    
                </ScrollView>
            </View>
        );
    }
    handleRegister = async () =>
    {
        try
        {
            var obj = {login:global.userName.trim(),password:global.password.trim(),
                name:global.firstName.trim(),email:global.email.trim()
                //,color:("#" + Math.floor(Math.random() * 16777215)).trim()
            };
            var js = JSON.stringify(obj);

            const response = await fetch('/api/v1/auth/register',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}
                ).then(res => {
                    if(res.status !== 201) alert("Invalid registration " + res.status);
                    else {
                      alert("Registration was successful.");
                      this.props.navigation.navigate('Registration');
                    }
                  });
        }
        catch(e)
        {
        this.setState({message: e.message });
        }
    } 

    changePasswordHandler = async (val) =>
    {
        global.password = val;
    }
    changeUserNameHandler = async (val) =>
    {
        global.userName = val;
    }  
    handleReturn = async () => {

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
});