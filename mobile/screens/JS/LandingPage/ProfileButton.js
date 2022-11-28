import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ProfileButton() {
    const[user, setUser] = useState([]);
    const color = user.color; // This will be replaced with user.color
    
    const clickProfileButton = async () => {
        navigation.navigate('Profile');
    }
    
    useEffect(() => {
      setUser({name: 'Austin', username: 'Austin', color:'rgba(89,35,206, 1)'});
    const data = fetch("/api/v1/auth/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => {
      res.json().then((data) => {
        // setUser(data.user);
        
      }) 
    })
    .catch(err => {
      console.log(err);
    }); 
    }, []);

  return (
    <View style = {styles.profileContainer}>
      <View style = {styles.profileTool}>
        <TouchableOpacity style={[styles.profileButton,{backgroundColor: color}]} 
            onPress={clickProfileButton}>
            <Text style={styles.buttonText}>{user.username?.charAt(0).toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
    /*
    <View class="ProfileContainer">
      <View class="ProfileTool">
        <Avatar onClick={clickProfileButton} style={{border: '3px solid #BABABA'}}
        sx={{ 
          bgcolor: `${color}`,
          '&:hover': {
            borderColor: '#158888'
          },
        }}
        >
          <View class="Text">
            {user.username?.charAt(0).toUpperCase()}
          </View>
        </Avatar>
      </View>
      <View class="TextName">
          Hello {user.name}!
      </View>
    </View>
    */
  );
}

const styles = StyleSheet.create({
    profileButton: {
        padding: 10,
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        borderWidth: 3,
        borderRadius: 60,
        borderColor: '#158888',
        width: 60,
        height: 60,
    },
    profileContainer: {
      alignContent: 'center',
      width: '25%',
    },
    profileTool: {
      height: '75%',
    },
    buttonText:{
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
    },
    textName: {
      fontSize: 16,
      flexWrap: 'wrap',
      color: 'white',
      alignSelf: 'center',
      textAlign: 'center',
      maxWidth: 72,
      marginTop: '40%',
      zIndex: 1,
    }
});