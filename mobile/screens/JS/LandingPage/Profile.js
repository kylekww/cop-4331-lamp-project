import React, { useState, useEffect } from 'react';
import { TouchableHighlight, StyleSheet, View, 
  Text, TouchableOpacity } from 'react-native';

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
        <TouchableHighlight style={[styles.profileButton,{backgroundColor: color}]} 
            onPress={clickProfileButton} underlayColor='rgb(60, 23, 141)'>
            <Text style={styles.buttonText}>{user.username?.charAt(0).toUpperCase()}</Text>
        </TouchableHighlight>
      </View>
      <Text style = {styles.textName}>Hello {user.name}!</Text>
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
        margin: 10,
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 3,
        borderRadius: 60,
        borderColor: '#158888',
        width: 60,
        height: 60,
    },
    profileContainer: {
      display: 'flex',
      alignContent: 'center',
      marginLeft: '5%',
    },
    profileTool: {
      width: 60,
      height: 60,
      flex: 5,
      height: '50%',
      textAlign: 'center',
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
    textName: {
      fontStyle: 'normal',
      fontSize: 16,
      color: 'white',
      left: '10%',
      top: '45%',
      zIndex: 1,
    }
});