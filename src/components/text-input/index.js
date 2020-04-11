import React from 'react';
import {TextInput, View, Text, Image} from 'react-native';

import styles from './styles';

const CustomizeTextInput = ({
  imgUrl,
  onChangeText,
  placeholder,
  value,
  inputStyles,
  isSecured = false,
  enabled = true,
  prefix,
  maxLength,
  keyboardType,
}) => (
  <View
    style={[
      styles.viewContainer,
      inputStyles,
      !enabled ? styles.disabled : '',
    ]}>
    {prefix && (
      <View style={{justifyContent: 'center', marginHorizontal: 10}}>
        <Text>{prefix}</Text>
      </View>
    )}

    <TextInput
      style={styles.txtInput}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      secureTextEntry={isSecured}
      editable={enabled}
      keyboardType={keyboardType}
    />
    <View style={{justifyContent: 'center'}}>
      <Image style={[styles.imgIcon, {marginLeft: 4}]} source={imgUrl} />
    </View>
  </View>
);

export default CustomizeTextInput;
