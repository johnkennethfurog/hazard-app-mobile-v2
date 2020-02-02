import React from 'react';

import {View, Image, Text, SafeAreaView} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {getLesson} from '../../actions/guide';
import Colors from '../../utils/colors';

import styles from './styles';

class LectureScreen extends React.Component {
  componentDidMount() {
    console.log('dispatch');
    this.props.dispatch(getLesson());
  }

  state = {
    activeSections: [],
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Image
          style={styles.contentImage}
          source={{
            uri: section.content,
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  render() {
    const {lessons} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Accordion
          underlayColor={Colors.red}
          sections={lessons}
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    lessons: state.guide.lessons,
  };
};

export default connect(mapStateToProps)(withNavigation(LectureScreen));
