import React from 'react';
import {ActivityIndicator, View, Image, Text} from 'react-native';
import styles from './styles';
import {checkIfSignIn} from '../../actions/user';
import {getProfile} from '../../actions/user';
import {connect} from 'react-redux';

class SplashScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      checkIfSignIn(isSignedin => {
        if (isSignedin) {
          this.props.dispatch(getProfile());
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
        <Image resizeMode="cover" source={require('../../images/icon.png')} />
        <Text
          style={{
            marginTop: -30,
            fontSize: 25,
            fontWeight: 'bold',
            color: '#DE350B',
          }}>
          SIRENE APP
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(SplashScreen);

/*

*/
