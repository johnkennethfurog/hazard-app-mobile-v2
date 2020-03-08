import {Alert} from 'react-native';

import {FETCH_GUIDES, GET_LESSONS} from '../actions/types';
import guideData from '../mocks/guides.json';
import lessonData from '../mocks/lessons';

const initialState = {
  isLoading: false,
  data: [],
  lessons: [],
  error: '',
};

export default function guides(state = initialState, action) {
  switch (action.type) {
    case `${GET_LESSONS}_ERROR`: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case `${GET_LESSONS}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case `${GET_LESSONS}_FULFILLED`: {
      const lessons = action.payload.data;
      console.log('lessons', lessons);
      return {
        lessons,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}
