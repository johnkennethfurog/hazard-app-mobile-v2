import {StyleSheet} from 'react-native';

import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.silver,
    padding: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.red,
    alignItems: 'center',
  },
});

export default styles;
