import axios from 'axios';

import {FETCH_GUIDES, GET_LESSONS} from './types';

export const fetchGuides = () => dispatch => {
  dispatch({
    type: FETCH_GUIDES,
  });
};

export const getLesson = () => dispatch => {
  dispatch({
    type: GET_LESSONS,
  });
};
