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

const WATER_IMAGE = require('../../images/warning.png');
import Colors from '../../utils/colors';
import styles from './styles';
import pickerStyles from './pickerStyles';

const options = {
  title: 'Select Image of hazard',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ComposeScreen extends React.Component {
  static navigationOptions = {
    headerRight: () => (
      <Button onPress={() => alert('This is a button!')} title="Submit" />
    ),
  };

  state = {
    remarks: '',
    hazardImage: null,
    rating: 1,
  };

  componentDidMount() {}

  onFinishedRating = rating => {
    this.setState({rating});
  };

  onRemoveImage = () => {
    this.setState({hazardImage: null});
  };

  onCameraTapped = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

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
    const {remarks, hazardImage, rating} = this.state;

    return (
      <View style={styles.container}>
        <Text style={[styles.txtLabel, {marginTop: 0}]}>HAZARD TYPE</Text>
        <RNPickerSelect
          style={pickerStyles}
          onValueChange={value => console.log(value)}
          items={[
            {label: 'Football', value: 'football'},
            {label: 'Baseball', value: 'baseball'},
            {label: 'Hockey', value: 'hockey'},
          ]}
        />

        <Text style={styles.txtLabel}>REMARKS</Text>
        <TextInput
          multiline
          autoCapitalize="none"
          numberOfLines={4}
          style={styles.txtInput}
          onChangeText={remarks => this.setState({remarks})}
          value={remarks}
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
      </View>
    );
  }
}

export default ComposeScreen;
