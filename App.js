import * as React from 'react';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import * as _ from 'lodash';

import AppWithNavigationState from './src/config/routes';
import AppReducer from './src/reducers/index';

const middleware = applyMiddleware(promise, thunk);
export const store = createStore(AppReducer, middleware);

class App extends React.PureComponent {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
