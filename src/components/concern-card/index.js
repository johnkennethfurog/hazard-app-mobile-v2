import React from 'react';
import {View, TouchableOpacity, Button, Text, Image} from 'react-native';

import Colors from '../../utils/colors';

import styles from './styles';
import moment from 'moment';

const LeaveCard = ({concern}) => {
  const statColor = concern.status === 'Pending' ? 'gray' : 'green';

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.white,
        marginVertical: 16,
        paddingHorizontal: 12,
        paddingVertical: 16,
        elevation: 5,
      }}>
      <Text
        style={{
          fontSize: 11,
          color: statColor,
          fontWeight: 'bold',
          alignSelf: 'flex-end',
        }}>
        {concern.status}
      </Text>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginVertical: 8,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.red,
          }}>
          {concern.concernType.name}
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: Colors.gray,
            marginHorizontal: 5,
          }}>
          {'|'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: Colors.gray,
          }}>
          {concern.barangay.name}
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: Colors.gray,
            marginHorizontal: 5,
          }}>
          {'|'}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: Colors.gray,
          }}>
          {moment(concern.date).fromNow()}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 14,
          color: Colors.dimgray,
        }}>
        {concern.concern}
      </Text>

      {concern.photo && (
        <Image
          style={{
            height: 200,
            marginTop: 10,
          }}
          source={{
            uri:
              'https://res.cloudinary.com/db2qrpicm/image/upload/v1583668812/zbkd4gmbucdm2s4d1rar.jpg',
          }}
        />
      )}
    </View>
  );
};

export default LeaveCard;
