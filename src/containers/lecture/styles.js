import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../utils/colors';

const screenHeight = Dimensions.get('window').height * 0.5;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  header: {
    padding: 12,
    backgroundColor: Colors.red,
    marginBottom: 1,
  },
  content: {
    padding: 20,
  },
  contentImage: {flex: 1, height: screenHeight},
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
});

export default styles;
