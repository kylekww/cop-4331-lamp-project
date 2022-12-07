import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity , View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from './Logo';
//import EditProfile from './EditProfile';

export default function Profile(Props) {
    const[user, setUser] = useState([]);
    const name = 'Austin';//user.name;
    const username = 'Test1';//user.username;
    
    useEffect(() => {
        const viewProfile = async () => 
        {
            const data = await fetch("https://hushucf.herokuapp.com/api/v1/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    res.json().then((data) => {
                        console.log(data);
                        setUser(data.user);
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        };
        viewProfile()
    }, [])
   
    const logOut = async () => 
    {
        const data = await fetch("https://hushucf.herokuapp.com/api/v1/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            Props.navigation.navigate('RealLogin');
        })
        .catch(err => {
          console.log(err);
        });
    };

    const returnLanding = async () => {
        console.log('return');
        Props.navigation.navigate('LandingPage');
    }    

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <View style = {{flex: 1}}>
            <LinearGradient
            // Background Linear Gradient
            colors={['rgba(128,199,239,1)', 'rgba(89,35,206,1)']}
            style={styles.background}
            />
            <View style={styles.logoConstraint}>
                <Logo isNew={true}></Logo>
            </View>
            <View style ={styles.container}>
                <View style = {styles.squarebg}>
                    <Text>Profile View</Text>
                    <Text style = {styles.profile}>Name: {name}</Text>
                    <Text style = {styles.profile}>Username: {username}</Text>
                    <TouchableOpacity style={styles.button} 
                        onPress={returnLanding}>
                        <Text style={styles.buttonText}>return</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.button} 
                        onPress={logOut}>
                        <Text style={styles.buttonText}>logout</Text>
                    </TouchableOpacity>
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
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    container: {
      padding: 10,
      margin: 10,
      alignItems: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      borderRadius: 60,
      borderColor: '#158888',
      width: '80%',
      height: '80%',
    },
    buttonText:{
        fontSize: 30,
        color: 'black',
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
        height: '80%',
        backgroundColor: 'rgb(231, 232, 243)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 60,
        borderColor: 'transparent',
    },
    logo: {
        width: 432,
        height: 432,
    },
    logoConstraint: {
        alignSelf: 'center',
        top: 20,
        height: 200,
        width: 200,
    },
    button: {
        margin: 10,
        alignSelf: 'center',
        borderColor: 'rgba(70, 24, 203, 0.9)',
        borderWidth: 6,
        borderRadius: 12,
        width: 120,
        height: 60,
    },
});