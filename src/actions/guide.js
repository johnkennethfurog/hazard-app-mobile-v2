import {hazardApiRequest} from '../client/client';

import {GET_LESSONS} from './types';

export const getLessons = () => dispatch => {
  dispatch({
    type: GET_LESSONS,
    payload: hazardApiRequest().get('/lesson'),
  });
};
