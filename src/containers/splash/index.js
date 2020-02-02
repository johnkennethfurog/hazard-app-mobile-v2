import React from 'react';
import { ActivityIndicator,View} from 'react-native';
import styles from './styles';

class SplashScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Auth');
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
         <ActivityIndicator />
       </View>
    );
  }
}

export default SplashScreen;
