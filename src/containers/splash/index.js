import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';
import {checkIfSignIn} from '../../actions/user';

class SplashScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      checkIfSignIn(isSignedin => {
        console.log('isSignedin', isSignedin);
        if (isSignedin) {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Auth');
        }
      });
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default SplashScreen;
