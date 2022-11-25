import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';

export default function ProfileButton() {
    const[user, setUser] = useState([]);
    const color = 'rgba(89,35,206,1)' // user.color; // This will be replaced with user.color
    
    const clickProfileButton = async () => {
        alert('clicked');
        //props.navigation.navigate('Registration');
    }
    /*
    useEffect(() => {
    const data = fetch("/api/v1/auth/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => {
      res.json().then((data) => {
        setUser(data.user);
      }) 
    })
    .catch(err => {
      console.log(err);
    });
    }, []);
  */

  return (
    <TouchableHighlight style={[styles.profileButton,{backgroundColor: color}]} 
        onPress={clickProfileButton} underlayColor='rgb(60, 23, 141)'>
        <Text style={styles.buttonText}>Austin</Text>
    </TouchableHighlight>
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
        borderWidth: 1,
        borderRadius: 60,
        width: 60,
        height: 60,
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
});