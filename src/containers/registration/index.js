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
import Loading from '../../components/loading';
import TermsConditions from '../../components/terms-conditions';

class RegistrationScreen extends React.Component {
  state = {
    name: '',
    email: '',
    barangay: '',
    address: '',
    mobileNumber: '',
    isTermsOpen: false,
  };

  componentDidMount() {
    this.props.dispatch(getBarangays());
  }

  onLoginClicked = () => {
    this.props.navigation.navigate('Auth');
  };

  onRegisterClicked = () => {
    const {name, email, mobileNumber, barangay} = this.state;
    if (isEmpty(name) || isEmpty(email) || isEmpty(barangay)) {
      Alert.alert('Name and Barangay are required fields');
      return;
    }

    this.props.dispatch(
      register(this.state, () => {
        this.props.navigation.navigate('Home');
      }),
    );
  };

  openTermsCondition = () => {
    this.setState({isTermsOpen: true});
  };

  closeTermsCondition = () => {
    this.setState({isTermsOpen: false});
  };

  render() {
    const {
      name,
      email,
      mobileNumber,
      address,
      barangay,
      isTermsOpen,
    } = this.state;
    const {barangays, isLoading} = this.props;

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
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'gray', fontSize: 25, fontWeight: 'bold'}}>
              REGISTRATION
            </Text>
            <Text style={{color: 'gray', fontSize: 12}}>
              JOIN OUR COMMUNITY
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
              keyboardType="email-address"
              inputStyles={{marginTop: 8}}
            />

            <CustomizeTextInput
              prefix={'+63'}
              onChangeText={mobileNumber => this.setState({mobileNumber})}
              placeholder="Contact Number"
              value={mobileNumber}
              maxLength={10}
              keyboardType="phone-pad"
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
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
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
            <TouchableOpacity onPress={this.openTermsCondition}>
              <Text
                style={{
                  marginTop: 30,
                  fontSize: 12,
                  color: Colors.red,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                View Terms and Condition
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Loading isVisible={isLoading} />

        <TermsConditions
          isOpen={isTermsOpen}
          onOpenModal={this.openTermsCondition}
          closeModal={this.closeTermsCondition}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {barangays} = state.concern;
  return {
    barangays,
    isLoading: state.citizen.isLoading,
  };
};

export default connect(mapStateToProps)(withNavigation(RegistrationScreen));
