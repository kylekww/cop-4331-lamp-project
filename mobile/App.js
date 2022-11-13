import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Loginscreen from './screens/JS/Login';
import RealLoginscreen from './screens/JS/RealLogin';
import Registrationscreen from './screens/JS/Registration';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Registration: {
    screen: Registrationscreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  },
  Login: {
    screen: Loginscreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  },
  RealLogin: {
    screen: RealLoginscreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  }
},{
  initialRouteName: "RealLogin"
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
