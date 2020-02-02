import React, {Component} from 'react';
import {Image, View, ImageBackground} from 'react-native';

import styles from './styles';
import COLORS from '../../utils/colors';

export default class CommonImageBackground extends Component {
  render() {
    const {bgImage} = this.props;
    let src = require('../../images/bg_image_v2.png');

    if (bgImage) {
      src = bgImage;
    }

    return (
      <ImageBackground source={src} style={styles.container}>
        {this.props.renderContent()}
      </ImageBackground>
    );
  }
}
