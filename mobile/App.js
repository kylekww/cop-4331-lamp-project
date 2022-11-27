import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { enableFreeze } from "react-native-screens";

import Loginscreen from './screens/JS/Login';
import RealLoginscreen from './screens/JS/RealLogin';
import Registrationscreen from './screens/JS/Registration';
import LandingPagescreen from './screens/JS/LandingPage';
import ProfileScreen from './screens/JS/Profile';

enableFreeze(true);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: Loginscreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  },
  Registration: {
    screen: Registrationscreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  },
  RealLogin: {
    screen: RealLoginscreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  },
  LandingPage: {
    screen: LandingPagescreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  }
},{
  initialRouteName: "Profile"
});

const AppContainer = createAppContainer(AppNavigator);
