import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import CommonImageBackground from '../../components/CommonImageBackground/CommonImageBackground';

import styles from './styles';

class LeftMenu extends Component {
  renderContent() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity
          onPress={() => {
            //NavigationService.navigate("Home");
            console.log('GELOBELO PROPS', this.props);
          }}>
          <Text style={styles.btn}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //NavigationService.navigate("Profile");
          }}>
          <Text style={styles.btn}>Profile</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  render() {
    return <CommonImageBackground renderContent={this.renderContent} />;
  }
}

export default LeftMenu;
