import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {isEmpty} from 'lodash';

import CustomizeTextInput from '../../components/text-input';
import Colors from '../../utils/colors';
import styles from './styles';
import {signin} from '../../actions/user';
import Loading from '../../components/loading';

class SignInScreen extends React.Component {
  state = {
    email: '',
    pass: '',
  };

  onLoginClicked = () => {
    const {email, pass} = this.state;

    if (isEmpty(email) || isEmpty(pass)) {
      Alert.alert('Email and Barangay is required');
      return;
    }

    this.props.dispatch(
      signin(this.state, () => {
        this.props.navigation.navigate('Home');
      }),
    );
  };

  onRegisterClicked = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    const {email, pass} = this.state;
    const {isLoading} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 20,
            width: '100%',
          }}>
          <View
            style={{
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="cover"
              style={{
                width: 190,
                height: 160,
              }}
              source={require('../../images/icon.png')}
            />
            <Text style={{color: 'gray', fontSize: 12}}>
              LOGIN TO YOUR ACCOUNT
            </Text>
          </View>

          <View style={{margin: 10, marginTop: 0}}>
            <CustomizeTextInput
              onChangeText={email => this.setState({email})}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
            />

            <CustomizeTextInput
              onChangeText={pass => this.setState({pass})}
              placeholder="Password"
              value={pass}
              inputStyles={{marginTop: 8}}
              isSecured
            />

            <View
              style={{
                marginTop: 16,
              }}>
              <TouchableOpacity
                onPress={this.onLoginClicked}
                style={styles.btn}>
                <Text
                  style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                  Login
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                  }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={this.onRegisterClicked}>
                  <Text style={{color: 'black', paddingHorizontal: 3}}>
                    Register Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Loading isVisible={isLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.citizen.isLoading,
  };
};

export default connect(mapStateToProps)(withNavigation(SignInScreen));
