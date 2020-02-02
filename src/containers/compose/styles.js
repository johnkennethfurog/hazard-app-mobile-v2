import {StyleSheet} from 'react-native';
import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  txtInput: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.white,
  },
  txtLabel: {
    fontSize: 12,
    marginBottom: 6,
    marginTop: 10,
    color: Colors.gray,
    fontWeight: 'bold',
  },
});

export default styles;
