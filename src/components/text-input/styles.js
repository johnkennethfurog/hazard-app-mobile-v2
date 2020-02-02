import {StyleSheet, Dimensions, Platform} from 'react-native';

import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: Colors.gray,
    borderWidth: 1,
  },
  txtInput: {
    flex: 1,
    height: 48,
    padding: 8,
  },
  imgIcon: {
    height: 16,
    width: 16,
  },
  disabled: {
    backgroundColor: Colors.silver,
  },
});

export default styles;
