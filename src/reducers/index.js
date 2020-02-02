import {combineReducers} from 'redux';

import AppContainer from '../config/routes';
import guide from './guide';

const navReducer = (state, action) => {
  const newState = AppContainer.router.getStateForAction(action, state);
  return newState || state;
};

const AppReducer = combineReducers({
  nav: navReducer,
  guide,
});

export default AppReducer;
