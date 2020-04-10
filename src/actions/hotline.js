import SInfo from 'react-native-sensitive-info';

import {hazardAuthorizeApiRequest} from '../client/client';
import {GET_HOTLINES, TOKEN} from './types';

export const getHotlines = () => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: GET_HOTLINES,
        payload: hazardAuthorizeApiRequest(token).get('/hotline'),
      });
    })
    .catch(err => {});
};
