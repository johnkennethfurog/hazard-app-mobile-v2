import {StyleSheet} from 'react-native';
import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.white,
    margin: 10,
    padding: 20,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.red,
  },

  info: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 5,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default styles;
