import {StyleSheet, Dimensions, Platform} from 'react-native';

import Colors from '../../utils/colors';

const screenWidth = Dimensions.get('window').width - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.silver,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    width: screenWidth / 3,
    height: screenWidth / 3,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

export default styles;
