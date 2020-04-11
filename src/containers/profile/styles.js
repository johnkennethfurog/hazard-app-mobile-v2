import {StyleSheet} from 'react-native';

import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.silver,
    padding: 20,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.red,
    alignItems: 'center',
  },
});

export default styles;
