import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ProfileButton(Props) {
    const[user, setUser] = useState([]);
    const color = user.color; // This will be replaced with user.color
    
    const clickProfileButton = async () => {
      Props.navigation.navigate('Profile');
    }
    
    useEffect(() => {
    const data = fetch("https://hushucf.herokuapp.com/api/v1/auth/profile", {
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

  return (
    <View style = {styles.profileContainer}>
      <View style = {styles.profileTool}>
        <TouchableOpacity style={[styles.profileButton,{backgroundColor: color}]} 
            onPress={clickProfileButton}>
            <Text style={styles.buttonText}>{user.username?.charAt(0).toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
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