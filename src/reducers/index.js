import {combineReducers} from 'redux';

import AppContainer from '../config/routes';
import guide from './guide';
import concern from './concern';

const navReducer = (state, action) => {
  const newState = AppContainer.router.getStateForAction(action, state);
  return newState || state;
};

const AppReducer = combineReducers({
  nav: navReducer,
  guide,
  concern,
});

export default AppReducer;
