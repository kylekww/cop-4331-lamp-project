import ProfileButton from './ProfileButton';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function Tools(Props) {

  // Toggle hot/new page
  const isNew = Props.isNew;
  const toggleIsNew = Props.toggleIsNew;
  // Button colors
  const newButtonColor = ['rgba(128,199,239,1)','white'];
  const hotButtonColor = ['white','rgba(222,98,28,1)'];

  // Click button logic
  const clickNewButton = async () => {
    if(!isNew) {
      toggleIsNew();
      UseNewButton();
      console.log("Showing New Confessions");
    }
  }
  const clickHotButton = async () => {
    if(isNew) {
      toggleIsNew();
      UseHotButton();
      console.log("Showing Hot Confessions");
    } 
  }

  return (
    <View style = {styles.tools}>
      <ProfileButton/>
      <View style ={styles.toolsCenter}>
        <TouchableOpacity style={[styles.newButton,{backgroundColor:newButtonColor[(isNew)?1:0]}]} 
            onPress={clickNewButton}>
            <Text style={[styles.buttonText,{color: newButtonColor[(!isNew)?1:0]}]}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.hotButton,{backgroundColor:hotButtonColor[(isNew)?1:0]}]} 
            onPress={clickHotButton}>
            <Text style={[styles.buttonText,{color: hotButtonColor[(!isNew)?1:0]}]}>Hot</Text>
        </TouchableOpacity>
      </View>
      <View style={{width:'50%'}}>
      </View>
    </View>
  );
}

// Page state change is triggered
async function UseNewButton() {
  return {text:"Click New"}
}
async function UseHotButton() {
  return {text:"Click Hot"}
}

const styles = StyleSheet.create({
  tools: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
    top: 0,
    zIndex: 999,
  },
  toolsCenter: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '25%',
  },
  newButton: {
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: 'rgba(70, 24, 203, 0.9)',
    borderWidth: 6,
    borderRadius: 12,
    width: 80,
    height: 40,
  },
  hotButton: {
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: 'rgba(167, 15, 15, 0.9)',
    borderWidth: 6,
    borderRadius: 12,
    width: 80,
    height: 40,
  },
  buttonText:{
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
  },
});