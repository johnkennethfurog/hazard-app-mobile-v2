import React from 'react';
import {Text, View, TouchableOpacity, Dimensions, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import Loading from '../../components/loading';
import Colors from '../../utils/colors';
import {
  locateMe,
  stopLocating,
  checkIfLocatingIsActive,
  checkifUserIsLocating,
} from '../../actions/user';

import {
  getCurrentLocation,
  getCurrentLocatingState,
} from '../../utils/maps-utils';

import styles from './styles';
const viewHeight = Dimensions.get('window').height * 0.2;
const screenWidth = Dimensions.get('window').width;

class LocateScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(checkifUserIsLocating());
  }

  toggleLocating = isLocating => {
    if (isLocating) {
      getCurrentLocation()
        .then(position => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('currentPosition', currentPosition);
          this.props.dispatch(locateMe(currentPosition));
        })
        .catch(error => {
          console.log('currentPosition - error', error);
          this.setState({isLocating: false});
        });
    } else {
      this.props.dispatch(stopLocating());
    }
  };

  render() {
    const {allowLocating, isLocating, isLoading} = this.props;

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
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LottieView
                source={require('../../animation/locating.json')}
                style={styles.lottieView}
                autoPlay
                loop
              />
              <TouchableOpacity
                style={[
                  styles.buttonTrigger,
                  {
                    position: 'absolute',
                  },
                ]}
                onPress={() => {
                  this.toggleLocating(false);
                }}>
                <Text style={styles.buttonLabel}>Stop Locating</Text>
              </TouchableOpacity>
            </View>
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
        <Loading isVisible={isLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLocating: state.citizen.isLocating,
    isLoading: state.citizen.isLoading,
  };
};

export default connect(mapStateToProps)(withNavigation(LocateScreen));
