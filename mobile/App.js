import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { enableFreeze } from "react-native-screens";
import { LogBox } from 'react-native';

import RealLoginscreen from './screens/JS/RealLogin';
import Registrationscreen from './screens/JS/Registration';
import LandingPagescreen from './screens/JS/LandingPage';
import ProfileScreen from './screens/JS/Profile';
import CommentsPageScreen from './screens/JS/Comments';

enableFreeze(true);

console.disableYellowBox = true;
LogBox.ignoreAllLogs();
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
  },
  CommentsPage: {
    screen: CommentsPageScreen,
    navigationOptions: {
      headerShown: false
    }
  }
},{
  initialRouteName: "CommentsPage"
});

const AppContainer = createAppContainer(AppNavigator);