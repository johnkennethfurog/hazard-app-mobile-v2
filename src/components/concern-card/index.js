import React from 'react';
import {View, TouchableOpacity, Button, Text, Image} from 'react-native';

import Colors from '../../utils/colors';

import styles from './styles';
import moment from 'moment';

const ConcernCard = ({concern}) => {
  const statColor = concern.status === 'Pending' ? 'gray' : 'green';

  return (
    <View style={styles.container}>
      <Text style={[styles.status, {color: statColor}]}>{concern.status}</Text>
      <View style={[styles.row, {marginTop: 8, marginBottom: 1}]}>
        <Text style={styles.concernType}>{concern.concernType.name}</Text>
        <Text style={styles.pipe}>{'|'}</Text>
        <Text style={styles.date}>{moment(concern.date).fromNow()}</Text>
      </View>

      <View style={styles.row}>
        <Image
          resizeMode="cover"
          style={{
            marginLeft: -5,
            width: 15,
            height: 15,
          }}
          source={require('../../images/place.png')}
        />
        <Text style={styles.address}>
          {concern.barangay.name} , {concern.address}
        </Text>
      </View>

      <Text style={styles.concern}>{concern.concern}</Text>

      {concern.photo && (
        <Image
          style={styles.image}
          source={{
            uri: concern.photo.url,
          }}
        />
      )}
    </View>
  );
};

export default ConcernCard;
