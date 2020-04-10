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
import RNPickerSelect from 'react-native-picker-select';
import {isEmpty} from 'lodash';

import CustomizeTextInput from '../../components/text-input';
import pickerStyles from '../../utils/pickerStyles';
import Colors from '../../utils/colors';
import styles from './styles';
import {register} from '../../actions/user';
import {getBarangays} from '../../actions/concern';

class RegistrationScreen extends React.Component {
  state = {
    name: '',
    email: '',
    barangay: '',
    address: '',
    mobileNumber: '',
  };

  componentDidMount() {
    this.props.dispatch(getBarangays());
  }

  onLoginClicked = () => {
    this.props.navigation.navigate('Auth');
  };

  onRegisterClicked = () => {
    const {name, email, mobileNumber, barangay} = this.state;
    if (isEmpty(email) || isEmpty(barangay)) {
      Alert.alert('Email and Barangay is required');
      return;
    }

    register(this.state, () => {
      this.props.navigation.navigate('Home');
    });
  };

  render() {
    const {name, email, mobileNumber, address, barangay} = this.state;
    const {barangays} = this.props;

    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            elevation: 5,
            padding: 20,
            width: '100%',
          }}>
          <View
            style={{
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'gray', fontSize: 25, fontWeight: 'bold'}}>
              PROFILE
            </Text>
          </View>

          <View style={{margin: 15}}>
            <CustomizeTextInput
              onChangeText={name => this.setState({name})}
              placeholder="Name"
              value={name}
            />

            <CustomizeTextInput
              onChangeText={email => this.setState({email})}
              placeholder="Email Address"
              value={email}
              inputStyles={{marginTop: 8}}
            />

            <CustomizeTextInput
              onChangeText={mobileNumber => this.setState({mobileNumber})}
              placeholder="Contact Number"
              value={mobileNumber}
              inputStyles={{marginTop: 8}}
            />

            <View
              style={{marginTop: 8, borderColor: Colors.gray, borderWidth: 1}}>
              <RNPickerSelect
                style={pickerStyles}
                placeholder={{
                  label: 'Select a Barnagay ...',
                  value: null,
                }}
                onValueChange={barangay => this.setState({barangay})}
                items={barangays}
              />
            </View>

            <CustomizeTextInput
              onChangeText={address => this.setState({address})}
              placeholder="Address"
              value={address}
              inputStyles={{marginTop: 8}}
            />

            <View
              style={{
                marginTop: 16,
              }}>
              <TouchableOpacity
                onPress={this.onRegisterClicked}
                style={styles.btn}>
                <Text
                  style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                  Register
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                  }}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={this.onLoginClicked}>
                  <Text style={{color: 'black', paddingHorizontal: 3}}>
                    Sign-in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {barangays} = state.concern;
  return {
    barangays,
  };
};

export default connect(mapStateToProps)(withNavigation(RegistrationScreen));
