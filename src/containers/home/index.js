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
import {fetchGuides} from '../../actions/guide';
import {getImageSource} from '../../utils/helper';
import Colors from '../../utils/colors';
import {Actions} from '../../utils/actions';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchGuides());
  }

  onDisasterClicked = disaster => {
    this.props.navigation.navigate('Lecture');
  };

  onActionClicked = action => {
    if (action === 'bt_location') {
      this.props.navigation.navigate('Locate');
    } else if (action === 'bt_send') {
      this.props.navigation.navigate('Compose');
    }
  };

  render() {
    const {guides} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={guides}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.onDisasterClicked(item);
                }}>
                <View style={styles.item}>
                  <Image
                    style={styles.img}
                    source={getImageSource(item.image)}
                  />
                  <Text>{item.label}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          //Setting the number of column
          numColumns={3}
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
    guides: state.guide.data,
  };
};

export default connect(mapStateToProps)(withNavigation(HomeScreen));
