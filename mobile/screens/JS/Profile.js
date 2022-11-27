import React, { useState, useEffect } from 'react';
import { TouchableHighlight, StyleSheet, TextInput, Button, View, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
    const[user, setUser] = useState([]);
    
    useEffect(() => {
        const viewProfile = async event => 
        {
            //setUser({user: 'Austin', username: 'Austin'});
            const data = await fetch("/api/v1/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => {
              res.json().then((data) => {
                console.log(data);
                //setUser(data.user);
                
              }) 
            })
            .catch(err => {
              console.log(err);
            });
        };
        viewProfile()
    }, [])
   
    const logOut = async event => 
    {
        const data = await fetch("/api/v1/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            navigation.navigate('RealLogin');
        })
        .catch(err => {
          console.log(err);
        });
    };

    const returnLanding = async (event) => {
        navigation.navigate('LandingPage');
    }    
        return (
            <View>
                <LinearGradient
                // Background Linear Gradient
                colors={['rgba(128,199,239,1)', 'rgba(89,35,206,1)']}
                style={styles.background}
                />
                <View style ={styles.container}>
                    <Text>Logo goes here</Text>
                    <View style = {styles.squarebg}>
                        <Text>Profile View</Text>
                        <Text style = {styles.profile}>Name: {user.name}</Text>
                        <Text style = {styles.profile}>Username: {user.username}</Text>
                        <View style = {styles.button}>
                            <Button title = "return" onClick= {returnLanding}>Return</Button>    
                            <Button title = "logout" onClick = {logOut}>Logout</Button>
                        </View>    
                    </View>   
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    profileButton: {
        padding: 10,
        margin: 10,
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 60,
        borderColor: '#158888',
        width: 60,
        height: 60,
    },
    container: {
      padding: 10,
      margin: 10,
      alignItems: 'center',
      textAlign: 'center',
      borderWidth: 1,
      borderRadius: 60,
      borderColor: '#158888',
      width: '80%',
      height: '80%',
    },
    buttonText:{
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
    },
    text: {
        marginTop: 25,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontSize: 30,
        color: 'rgba(89,35,206,1)',
        margin: 10,
    },
    squarebg: {
        padding: 5,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(231, 232, 243)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'transparent',
      },
});