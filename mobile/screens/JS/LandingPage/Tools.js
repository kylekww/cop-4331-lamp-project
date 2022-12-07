import ProfileButton from './ProfileButton';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Logo from '../Logo';

export default function Tools(Props) {

  // Toggle hot/new page
  const isNew = Props.isNew;
  const toggleIsNew = Props.toggleIsNew;
  // Button colors
  const newButtonColor = ['white','rgba(89,35,206,.5)','rgba(89,35,206,1)'];
  const hotButtonColor = ['white','rgba(167, 15, 15, 0.4)','rgba(167, 15, 15, 0.9)'];

  // Click button logic
  const clickNewButton = async () => {
    if(!isNew) {
      toggleIsNew();
      UseNewButton();
    }
  }
  const clickHotButton = async () => {
    if(isNew) {
      toggleIsNew();
      UseHotButton();
    } 
  }

  return (
    <View style = {styles.tools}>
      <ProfileButton navigation={Props.navigation}></ProfileButton>
      <View style ={styles.toolsCenter}>
        <TouchableOpacity style={[styles.newButton,{backgroundColor:newButtonColor[(isNew)?1:0]}]} 
            onPress={clickNewButton}>
            <Text style={[styles.buttonText,{color: newButtonColor[(isNew)?0:2]}]}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.hotButton,{backgroundColor:hotButtonColor[(isNew)?0:1]}]} 
            onPress={clickHotButton}>
            <Text style={[styles.buttonText,{color: hotButtonColor[(isNew)?2:0]}]}>Hot</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.logoContainer}>
        <View style = {styles.logoConstraint}>
          <Logo isNew={isNew}></Logo>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tools: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
    top: 10,
    zIndex: 999,
  },
  toolsCenter: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '25%',
  },
  newButton: {
    margin: 10,
    alignSelf: 'center',
    borderColor: 'rgba(70, 24, 203, 0.9)',
    borderWidth: 6,
    borderRadius: 12,
    width: 80,
    height: 45,
  },
  hotButton: {
    margin: 10,
    alignSelf: 'center',
    borderColor: 'rgba(167, 15, 15, 0.9)',
    borderWidth: 6,
    borderRadius: 12,
    width: 80,
    height: 45,

  },
  buttonText:{
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
  },
  logoConstraint: {
    top: 30,
    height: 80,
    width: 80,
  },
  logoContainer: {
    flexWrap: 'wrap-reverse',
    top:30,
    right: 20,
    height: 200,
    width: 200,
    zIndex:-1,
  },
});