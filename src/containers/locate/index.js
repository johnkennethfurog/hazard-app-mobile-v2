import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../../utils/colors';
import {locateMe, stopLocating} from '../../actions/user';

import {getCurrentLocation} from '../../utils/maps-utils';

import styles from './styles';
const viewHeight = Dimensions.get('window').height * 0.2;

class LocateScreen extends React.Component {
  state = {
    isLocating: false,
  };

  componentDidMount() {}

  toggleLocating = isLocating => {
    if (isLocating) {
      getCurrentLocation()
        .then(position => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          //console.log('currentPosition', currentPosition);

          locateMe(currentPosition, () => {
            console.log('error toggleLocating');
          });
        })
        .catch(error => {
          console.log('currentPosition - error', error);
        });
    } else {
      stopLocating(() => {
        console.log('error stop Locating');
      });
    }
    this.setState({isLocating});
  };

  render() {
    const {isLocating} = this.state;

    return (
      <View style={styles.container}>
        <View style={{height: viewHeight, width: '100%'}}>
          <Text
            style={{
              position: 'absolute',
              bottom: 10,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              width: '100%',
            }}>
            {isLocating
              ? 'We are now locating your location.'
              : 'Will automatically received your location where the emergency came from. In case of emergency tap the red circle.'}
          </Text>
        </View>
        <View style={styles.centerItem}>
          {isLocating && (
            <LottieView
              source={require('../../animation/locating.json')}
              style={styles.lottieView}
              autoPlay
              loop>
              <TouchableOpacity
                style={styles.buttonTrigger}
                onPress={() => {
                  this.toggleLocating(false);
                }}>
                <Text style={styles.buttonLabel}>Stop Locating</Text>
              </TouchableOpacity>
            </LottieView>
          )}

          {!isLocating && (
            <TouchableOpacity
              onPress={() => {
                this.toggleLocating(true);
              }}>
              <View
                style={[styles.buttonTrigger, {backgroundColor: Colors.red}]}>
                <Text style={styles.buttonLabel}>Locate Me!</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default LocateScreen;
