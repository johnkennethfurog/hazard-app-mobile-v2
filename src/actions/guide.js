import SInfo from 'react-native-sensitive-info';

import {hazardAuthorizeApiRequest} from '../client/client';
import {GET_LESSONS, TOKEN} from './types';

export const getLessons = () => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: GET_LESSONS,
        payload: hazardAuthorizeApiRequest(token).get('/lesson'),
      });
    })
    .catch(err => {});
};
