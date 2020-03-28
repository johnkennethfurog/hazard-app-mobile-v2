import * as React from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  alert,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import styles from './styles';
import {getLessons} from '../../actions/guide';
import {getImageSource} from '../../utils/helper';
import Colors from '../../utils/colors';
import {Actions} from '../../utils/actions';

class LessonsScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(getLessons());
  }

  onDisasterClicked = lesson => {
    this.props.navigation.navigate('Lecture', {lesson});
  };

  render() {
    const {lessons} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={lessons}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.onDisasterClicked(item);
                }}>
                <View style={styles.item}>
                  <Image style={styles.img} source={{uri: item.icon}} />
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    lessons: state.guide.lessons,
  };
};

export default connect(mapStateToProps)(withNavigation(LessonsScreen));
