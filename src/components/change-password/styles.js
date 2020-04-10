import {StyleSheet, Dimensions, Platform} from 'react-native';

import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
  },

  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  btnClose: {
    height: 15,
    width: 15,
  },
  viewHeader: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
  },
  btnChange: {
    backgroundColor: Colors.red,
    padding: 15,
    marginTop: 10,
  },
  btnChangeText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
