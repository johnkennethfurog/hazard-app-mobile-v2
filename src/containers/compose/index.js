import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Keyboard,
  Button,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Rating, AirbnbRating} from 'react-native-ratings';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {isEmpty} from 'lodash';

import Loading from '../../components/loading';
import Colors from '../../utils/colors';
import styles from './styles';
import pickerStyles from '../../utils/pickerStyles';

import {
  reportConcern,
  getConcernTypes,
  getBarangays,
  uploadPhoto,
} from '../../actions/concern';

const WATER_IMAGE = require('../../images/warning.png');
const options = {
  title: 'Select Image of hazard',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

let self;
class ComposeScreen extends React.Component {
  static navigationOptions = {
    headerRight: () => (
      <TouchableOpacity
        style={{paddingRight: 10}}
        onPress={() => {
          self.onSubmit();
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    ),
  };

  state = {
    barangay: '',
    concernType: '',
    concern: '',
    hazardImage: null,
    urgencyLevel: 1,
    address: '',
    showRating: true,
  };

  onSubmit = () => {
    const {isLoading} = this.props;
    const {concernType, barangay, hazardImage} = this.state;

    if (isLoading) {
      return;
    }

    if (isEmpty(concernType)) {
      alert('Concern type is required');
      return;
    }

    if (isEmpty(barangay)) {
      alert('Barangay is required');
      return;
    }

    if (!hazardImage) {
      this.sendPost();
    } else {
      this.props.dispatch(uploadPhoto(hazardImage));
    }
  };

  sendPost = () => {
    const {uploadedPhoto} = this.props;
    const payload = this.state;
    payload.photo = uploadedPhoto;
    this.props.dispatch(
      reportConcern(this.state, () => {
        this.props.navigation.goBack();
      }),
    );
  };

  componentDidMount() {
    self = this;

    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );

    this.props.dispatch(getBarangays());
    this.props.dispatch(getConcernTypes());
  }

  componentDidUpdate(prevProps) {
    const {uploadedPhoto} = this.props;

    if (uploadedPhoto && prevProps.uploadedPhoto !== uploadedPhoto) {
      this.sendPost();
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    this.setState({showRating: false});
  };

  keyboardWillHide = event => {
    this.setState({showRating: true});
  };

  onFinishedRating = urgencyLevel => {
    this.setState({urgencyLevel});
  };

  onRemoveImage = () => {
    this.setState({hazardImage: null});
  };

  onCameraTapped = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          hazardImage: source,
        });
      }
    });
  };

  onSelectHazardTypes = concernType => {
    const {concernTypesRaw} = this.props;

    const type = concernTypesRaw.find(x => x._id === concernType);

    this.setState({
      concernType,
      urgencyLevel: type.urgencyLevel,
    });
  };

  render() {
    const {
      concern,
      hazardImage,
      showRating,
      address,
      urgencyLevel,
    } = this.state;
    const {barangays, concernTypes, isLoading} = this.props;
    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.container}>
          <Text style={[styles.txtLabel, {marginTop: 0}]}>HAZARD TYPE</Text>
          <RNPickerSelect
            style={pickerStyles}
            onValueChange={this.onSelectHazardTypes}
            items={concernTypes}
          />

          <Text style={[styles.txtLabel]}>BARANGAYS</Text>
          <RNPickerSelect
            style={pickerStyles}
            onValueChange={barangay => this.setState({barangay})}
            items={barangays}
          />

          <Text style={styles.txtLabel}>ADDRESS</Text>
          <TextInput
            multiline
            autoCapitalize="none"
            numberOfLines={3}
            style={[
              {
                textAlignVertical: 'top',
                padding: 8,
                backgroundColor: Colors.white,
              },
            ]}
            onChangeText={address => this.setState({address})}
            value={address}
            placeholder={'Street Address / Purok / Phase / Landmark'}
          />

          <Text style={styles.txtLabel}>REMARKS</Text>
          <TextInput
            multiline
            autoCapitalize="none"
            numberOfLines={4}
            style={styles.txtInput}
            onChangeText={concern => this.setState({concern})}
            value={concern}
            placeholder={'Describe what happen ...'}
          />
          {showRating && (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: Colors.white,
                paddingBottom: 25,
              }}>
              <Text style={[styles.txtLabel, {marginBottom: 0}]}>
                HAZARD LEVEL :
              </Text>
              <AirbnbRating
                count={3}
                reviews={['Low Risk', 'Moderate Risk!', 'High Risk!!']}
                selectedColor={Colors.red}
                reviewColor={Colors.red}
                defaultRating={urgencyLevel}
                size={45}
                onFinishRating={this.onFinishedRating}
              />
            </View>
          )}

          {showRating && (
            <View
              style={{
                backgroundColor: Colors.white,
                padding: 5,
                alignItems: 'flex-end',
                dispaly: 'flex',
              }}>
              <TouchableOpacity onPress={this.onCameraTapped}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../../images/camera.png')}
                />
              </TouchableOpacity>
            </View>
          )}
          {hazardImage && showRating && (
            <View>
              <Image
                source={hazardImage}
                style={{width: '100%', height: 150}}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                }}
                onPress={this.onRemoveImage}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../../images/delete.png')}
                />
              </TouchableOpacity>
            </View>
          )}

          <Loading isVisible={isLoading} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    concernTypes,
    barangays,
    uploadedPhoto,
    isLoading,
    concernTypesRaw,
  } = state.concern;
  return {
    concernTypes,
    barangays,
    uploadedPhoto,
    isLoading,
    concernTypesRaw,
  };
};

export default connect(mapStateToProps)(withNavigation(ComposeScreen));
