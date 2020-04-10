import {combineReducers} from 'redux';

import AppContainer from '../config/routes';
import guide from './guide';
import concern from './concern';
import citizen from './citizen';
import hotline from './hotline';

const navReducer = (state, action) => {
  const newState = AppContainer.router.getStateForAction(action, state);
  return newState || state;
};

const AppReducer = combineReducers({
  nav: navReducer,
  guide,
  concern,
  citizen,
  hotline,
});

export default AppReducer;
