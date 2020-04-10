import {StyleSheet} from 'react-native';
import Colors from './colors';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: Colors.gray,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    color: Colors.gray,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default pickerSelectStyles;
