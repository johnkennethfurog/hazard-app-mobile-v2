import React from 'react';
import {
  TextInput,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import Loading from '../../components/loading';

import CustomizeTextInput from '../text-input';
import styles from './styles';

const ChangePassword = ({
  isOpen,
  closeModal,
  pass,
  oldPass,
  confirmPass,
  onPassChange,
  onOldPassChange,
  onConfirmPassChange,
  onPressChangeBtn,
  isChangingPassword,
}) => (
  <Modal animationType="fade" transparent={true} visible={isOpen}>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.viewHeader}>
          <Text style={styles.textHeader}>Change Password</Text>
          <TouchableOpacity onPress={() => closeModal()}>
            <Image
              source={require('../../images/close-button.png')}
              style={styles.btnClose}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{padding: 15}}>
          <CustomizeTextInput
            onChangeText={onOldPassChange}
            placeholder="Old Password"
            isSecured
            inputStyles={{marginBottom: 10}}
            value={oldPass}
          />
          <CustomizeTextInput
            onChangeText={onPassChange}
            placeholder="New Password"
            isSecured
            inputStyles={{marginBottom: 10}}
            value={pass}
          />
          <CustomizeTextInput
            onChangeText={onConfirmPassChange}
            placeholder="Confirm Password"
            isSecured
            inputStyles={{marginBottom: 10}}
            value={confirmPass}
          />

          <TouchableOpacity onPress={onPressChangeBtn} style={styles.btnChange}>
            <Text style={styles.btnChangeText}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loading isVisible={isChangingPassword} />
    </View>
  </Modal>
);

export default ChangePassword;
