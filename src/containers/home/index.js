import * as React from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {FloatingAction} from 'react-native-floating-action';
import {isEmpty} from 'lodash';

import styles from './styles';
import {getConcerns} from '../../actions/concern';
import {
  changePassword,
  checkIfNeedToChangePass,
  signOut,
} from '../../actions/user';
import {getImageSource} from '../../utils/helper';
import Colors from '../../utils/colors';
import {Actions} from '../../utils/actions';
import ConcernCard from '../../components/concern-card';
import ChangePassword from '../../components/change-password';
import Loading from '../../components/loading';

let self;
class HomeScreen extends React.Component {
  state = {
    openChangePass: false,
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  static navigationOptions = {
    headerRight: () => (
      <TouchableOpacity
        style={{paddingRight: 10}}
        onPress={() => {
          self.onLogout();
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    ),
  };

  componentDidMount() {
    self = this;
    this.props.dispatch(getConcerns());
    checkIfNeedToChangePass(openChangePass => {
      this.setState({openChangePass});
    });
  }

  onLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Yes',
        onPress: () => {
          signOut(() => {
            this.props.navigation.navigate('Auth');
          });
        },
      },
      {text: 'No'},
    ]);
  };

  onCloseModal = () => {
    this.setState({
      openChangePass: false,
    });
  };

  onDisasterClicked = lesson => {
    this.props.navigation.navigate('Lecture', {lesson});
  };

  onActionClicked = action => {
    if (action === 'bt_location') {
      this.props.navigation.navigate('Locate');
    } else if (action === 'bt_send') {
      this.props.navigation.navigate('Compose');
    } else if (action === 'bt_lessons') {
      this.props.navigation.navigate('Lessons');
    } else if (action === 'bt_hotline') {
      this.props.navigation.navigate('Hotline');
    } else if (action === 'bt_profile') {
      this.props.navigation.navigate('Profile');
    }
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

  renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, color: Colors.gray}}>
          No Concern to display
        </Text>
      </View>
    );
  };

  render() {
    const {concerns, isChangingPassword, isLoading} = this.props;
    const {openChangePass, password, oldPassword, confirmPassword} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={concerns}
          ListEmptyComponent={this.renderEmpty}
          renderItem={({item}) => <ConcernCard concern={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <FloatingAction
          actions={Actions}
          color={Colors.red}
          floatingIcon={require('../../images/menu.png')}
          onPressItem={name => {
            this.onActionClicked(name);
          }}
        />
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
          isChangingPassword={isChangingPassword}
        />
        <Loading isVisible={isLoading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const {profile} = state.citizen;
  return {
    isLoading: state.concern.isLoading,
    concerns: state.concern.concerns,
    isChangingPassword: state.citizen.isLoading,
  };
};

export default connect(mapStateToProps)(withNavigation(HomeScreen));
