import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
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
      <Button onPress={() => self.onSubmit()} title="Submit" />
    ),
  };

  state = {
    barangay: '',
    concernType: '',
    concern: '',
    hazardImage: null,
    urgencyLevel: 1,
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
    this.props.dispatch(getBarangays());
    this.props.dispatch(getConcernTypes());
  }

  componentDidUpdate(prevProps) {
    const {uploadedPhoto} = this.props;

    if (uploadedPhoto && prevProps.uploadedPhoto !== uploadedPhoto) {
      this.sendPost();
    }
  }

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

  render() {
    const {concern, hazardImage} = this.state;
    const {barangays, concernTypes, isLoading} = this.props;

    return (
      <View style={styles.container}>
        <Text style={[styles.txtLabel, {marginTop: 0}]}>HAZARD TYPE</Text>
        <RNPickerSelect
          style={pickerStyles}
          onValueChange={concernType => this.setState({concernType})}
          items={concernTypes}
        />

        <Text style={[styles.txtLabel]}>BARANGAYS</Text>
        <RNPickerSelect
          style={pickerStyles}
          onValueChange={barangay => this.setState({barangay})}
          items={barangays}
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
            count={5}
            reviews={[
              'Moderate',
              'Serious!',
              'Extreme!',
              'Life Threatening!',
              'Disaster!',
            ]}
            selectedColor={Colors.red}
            reviewColor={Colors.red}
            defaultRating={1}
            size={45}
            onFinishedRating={this.onFinishedRating}
          />
        </View>
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
        {hazardImage && (
          <View>
            <Image source={hazardImage} style={{width: '100%', height: 150}} />
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
    );
  }
}

const mapStateToProps = state => {
  const {concernTypes, barangays, uploadedPhoto, isLoading} = state.concern;
  return {
    concernTypes,
    barangays,
    uploadedPhoto,
    isLoading,
  };
};

export default connect(mapStateToProps)(withNavigation(ComposeScreen));
