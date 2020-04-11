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
import {updateProfile} from '../../actions/user';
import {getBarangays} from '../../actions/concern';
import ChangePassword from '../../components/change-password';
import Loading from '../../components/loading';

class ProfileScreen extends React.Component {
  state = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
    openChangePass: false,

    name: '',
    email: '',
    barangay: '',
    address: '',
    mobileNumber: '',
  };

  constructor(props) {
    super(props);

    const {name, barangay, email, address, mobileNumber} = props.profile;
    this.state = {
      name,
      address,
      email,
      mobileNumber: mobileNumber.substring(3, 13),
      openChangePass: false,
    };
  }

  componentDidMount() {
    const {barangay} = this.props.profile;
    this.props.dispatch(
      getBarangays(() => {
        this.setState({barangay});
      }),
    );
  }

  onUpdateClicked = () => {
    const {email, name, mobileNumber, barangay, address} = this.state;
    if (isEmpty(name) || isEmpty(barangay)) {
      Alert.alert('Name and Barangay are required fields');
      return;
    }

    this.props.dispatch(
      updateProfile({name, email, barangay, address, mobileNumber}),
    );
  };

  onPressChangeBtn = () => {
    const {password, oldPassword, confirmPassword} = this.state;

    if ((isEmpty(password), isEmpty(oldPassword), isEmpty(confirmPassword))) {
      Alert.alert('All fields are required');
      return;
    }

    if (confirmPassword !== password) {
      Alert.alert('Password does not match');
      return;
    }

    this.props.dispatch(
      changePassword(password, oldPassword, () => {
        this.setState({
          openChangePass: false,
          password: '',
          oldPassword: '',
          confirmPassword: '',
        });
      }),
    );
  };

  onCloseModal = () => {
    this.setState({
      openChangePass: false,
    });
  };

  onOpenModal = () => {
    this.setState({
      openChangePass: true,
    });
  };

  render() {
    const {
      name,
      email,
      mobileNumber,
      address,
      barangay,
      password,
      oldPassword,
      confirmPassword,
      openChangePass,
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
              enabled={false}
              value={email}
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
                value={barangay}
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
                onPress={this.onUpdateClicked}
                style={styles.btn}>
                <Text
                  style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                  UPDATE
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 16,
              }}>
              <TouchableOpacity onPress={this.onOpenModal} style={styles.btn}>
                <Text
                  style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                  CHANGE PASSWORD
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ChangePassword
          closeModal={this.onCloseModal}
          oldPass={oldPassword}
          confirmPass={confirmPassword}
          pass={password}
          onPressChangeBtn={this.onPressChangeBtn}
          onPassChange={password => {
            this.setState({password});
          }}
          onOldPassChange={oldPassword => {
            this.setState({oldPassword});
          }}
          onConfirmPassChange={confirmPassword => {
            this.setState({confirmPassword});
          }}
          isOpen={openChangePass}
          isChangingPassword={isLoading}
        />
        <Loading isVisible={isLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {barangays} = state.concern;
  const {profile, isLoading} = state.citizen;
  return {
    barangays,
    profile,
    isLoading,
  };
};

export default connect(mapStateToProps)(withNavigation(ProfileScreen));
