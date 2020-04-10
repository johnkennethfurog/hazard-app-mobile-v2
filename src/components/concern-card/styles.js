import {StyleSheet} from 'react-native';
import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.white,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    elevation: 5,
  },
  btn: {
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 4,
    flex: 1,
  },
  btnTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    color: Colors.gray,
  },
  address: {
    fontSize: 12,
    color: Colors.gray,
  },
  concern: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.dimgray,
  },
  concernType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.red,
  },
  status: {
    fontSize: 11,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pipe: {
    fontSize: 8,
    color: Colors.gray,
    marginHorizontal: 5,
  },
  image: {
    height: 200,
    marginTop: 10,
  },
});

export default styles;
