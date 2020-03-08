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
import {FloatingAction} from 'react-native-floating-action';

import styles from './styles';
import {getConcerns} from '../../actions/concern';
import {getImageSource} from '../../utils/helper';
import Colors from '../../utils/colors';
import {Actions} from '../../utils/actions';
import ConcernCard from '../../components/concern-card';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(getConcerns());
  }

  onDisasterClicked = lesson => {
    this.props.navigation.navigate('Lecture', {lesson});
  };

  onActionClicked = action => {
    if (action === 'bt_location') {
      this.props.navigation.navigate('Locate');
    } else if (action === 'bt_send') {
      this.props.navigation.navigate('Compose');
    } else if (action === 'bt_lessons') {
      this.props.navigation.navigate('Lessons');
    }
  };

  render() {
    const {concerns} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={concerns}
          renderItem={({item}) => <ConcernCard concern={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <FloatingAction
          actions={Actions}
          color={Colors.red}
          onPressItem={name => {
            this.onActionClicked(name);
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    concerns: state.concern.concerns,
  };
};

export default connect(mapStateToProps)(withNavigation(HomeScreen));
