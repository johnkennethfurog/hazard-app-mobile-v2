import React from 'react';
import {TextInput, View, Image} from 'react-native';

import styles from './styles';

const CustomizeTextInput = ({
  imgUrl,
  onChangeText,
  placeholder,
  value,
  inputStyles,
  isSecured = false,
  enabled = true,
}) => (
  <View
    style={[
      styles.viewContainer,
      inputStyles,
      !enabled ? styles.disabled : '',
    ]}>
    <TextInput
      style={styles.txtInput}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder={placeholder}
      secureTextEntry={isSecured}
      editable={enabled}
    />
    <View style={{justifyContent: 'center'}}>
      <Image style={[styles.imgIcon, {marginLeft: 4}]} source={imgUrl} />
    </View>
  </View>
);

export default CustomizeTextInput;
