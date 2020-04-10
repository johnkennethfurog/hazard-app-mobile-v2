import React from 'react';
import {View, TouchableOpacity, Button, Text, Image} from 'react-native';

import Colors from '../../utils/colors';

import styles from './styles';
import moment from 'moment';

const HotlineCard = ({hotline}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{hotline.name}</Text>
      <View style={styles.row}>
        <Image
          resizeMode="cover"
          style={{
            marginLeft: -5,
            width: 15,
            height: 15,
          }}
          source={require('../../images/email.png')}
        />
        <Text style={styles.info}>{hotline.email}</Text>
      </View>
      <View style={styles.row}>
        <Image
          resizeMode="cover"
          style={{
            marginLeft: -5,
            width: 15,
            height: 15,
          }}
          source={require('../../images/mobile.png')}
        />
        <Text style={styles.info}>{hotline.contactNumber}</Text>
      </View>
    </View>
  );
};

export default HotlineCard;
