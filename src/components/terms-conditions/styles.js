import {StyleSheet, Dimensions, Platform} from 'react-native';

import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    height: '100%',
    paddingVertical: 48,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
    paddingVertical: 16,
    justifyContent: 'center',
  },
  btnChange: {
    backgroundColor: Colors.red,
    padding: 15,
    marginVertical: 20,
  },
  btnChangeText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
