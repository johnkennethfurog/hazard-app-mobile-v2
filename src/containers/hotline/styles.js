import {StyleSheet, Dimensions, Platform} from 'react-native';

import Colors from '../../utils/colors';

const screenWidth = Dimensions.get('window').width - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.silver,
  },
});

export default styles;
