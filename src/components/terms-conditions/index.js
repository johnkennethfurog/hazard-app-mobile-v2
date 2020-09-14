import React from 'react';
import {
  TextInput,
  ScrollView,
  Image,
  Modal,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import styles from './styles';

const TermsConditions = ({isOpen, closeModal}) => (
  <Modal animationType="fade" transparent={true} visible={isOpen}>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.viewHeader}>
          <Text style={styles.textHeader}>Terms and Conditions</Text>
          <TouchableOpacity onPress={() => closeModal()}>
            <Image
              source={require('../../images/close-button.png')}
              style={styles.btnClose}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={{marginBottom: 20}}>
          SIREN Mobile Application respects and upholds data privacy rights and
          aims to comply with the requirements of the DPA. SIREN Mobile
          Application ensures that all personal data collected from the data
          subjects are processed, pursuant to the general principles of
          transparency, legitimate purpose, and proportionality, as stipulated
          in the Act. SIREN Mobile Application also adhere balance to the
          personal privacy and the free flow of information, especially when
          practicing our legitimate interests and when necessary to carry out
          our responsibilities as part of the academic research. Should there be
          concerns or questions with respect to data subject rights, you may
          contact
        </Text>

        <Text>Mark S. Sangcap</Text>
        <Text>Email: marksangcap@gmail.com</Text>
        <Text>Mobile: +639293789900</Text>
        <Text>Address: P. Montecer St. Poblacion Malvar Batangas</Text>

        <TouchableOpacity onPress={closeModal} style={styles.btnChange}>
          <Text style={styles.btnChangeText}>I Understand</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default TermsConditions;
