import * as React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import SignInScreen from '../containers/signin';
import HomeScreen from '../containers/home';
import LectureScreen from '../containers/lecture';
import SplashScreen from '../containers/splash';
import ComposeScreen from '../containers/compose';
import LocateScreen from '../containers/locate';
import LessonsScreen from '../containers/lessons';
import RegistrationScreen from '../containers/registration';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Lecture: LectureScreen,
    Compose: ComposeScreen,
    Locate: LocateScreen,
    Lessons: LessonsScreen,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
  },
);

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const RegistrationStack = createStackNavigator({
  Registration: {
    screen: RegistrationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const RootStack = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Home: HomeStack,
    Auth: AuthStack,
    Register: RegistrationStack,
  },
  {
    initialRouteName: 'Splash',
  },
);

const AppWithNavigationState = createAppContainer(RootStack);

// const AppWithNavigationState = ({dispatch, nav}) => (
//   <AppContainer
//     navigation={ReactNavigation.addNavigationHelpers({dispatch, state: nav})}
//   />
// );

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
