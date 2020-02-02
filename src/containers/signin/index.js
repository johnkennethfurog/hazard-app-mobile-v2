import * as React from 'react';
import { Button, Image, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import CustomizeTextInput from '../../components/text-input';
import styles from './styles';

class SignInScreen extends React.Component {
  state = {
    empId: '32041',
    password: '12345',
  };

  onLoginClicked = () => {

    this.props.navigation.navigate('Home');
    return;
    const {empId, password} = this.state;

    if (empId !== '' || password !== '') {
      this.props.dispatch(login({empId, password}));
    }
  };

  componentDidUpdate(prevProps) {
    const {data} = this.props;

    if (data && prevProps.data !== data) {
      this.props.navigation.navigate('MainDrawer');
    }
  }

  render() {
    const {empId, password} = this.state;

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
              THE APPROVER
            </Text>
            <Text style={{color: 'gray', fontSize: 12}}>
              LOGIN TO YOUR ACCOUNT
            </Text>
          </View>

          <View style={{margin: 15}}>
            <CustomizeTextInput
              onChangeText={empId => this.setState({empId})}
              placeholder="User ID"
              value={empId}
            />

            <CustomizeTextInput
              onChangeText={password => this.setState({password})}
              placeholder="Password"
              value={password}
              inputStyles={{marginTop: 8}}
              isSecured
            />

            <View
              style={{
                flexDirection: 'row',
                marginTop: 16,
                
                justifyContent: 'center',
              }}>
              <View style={{flex: 1}}>
                <Button
                  style={{backgroundColor: 'blue'}}
                  title="Login"
                  onPress={this.onLoginClicked}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(withNavigation(SignInScreen));
