import * as React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {isEmpty} from 'lodash';

import styles from './styles';
import {getHotlines} from '../../actions/hotline';
import Colors from '../../utils/colors';
import HotlineCard from '../../components/hotline-card';
import Loading from '../../components/loading';

class HotlineScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(getHotlines());
  }
  render() {
    const {hotlines, isLoading} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={hotlines}
          renderItem={({item}) => <HotlineCard hotline={item} />}
          keyExtractor={(item, index) => index.toString()}
        />

        <Loading isVisible={isLoading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.hotline.isLoading,
    hotlines: state.hotline.hotlines,
  };
};

export default connect(mapStateToProps)(withNavigation(HotlineScreen));
