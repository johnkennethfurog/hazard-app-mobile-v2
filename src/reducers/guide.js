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
    case `${GET_LESSONS}_ERROR`:
    case `${FETCH_GUIDES}_ERROR`: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case `${GET_LESSONS}_PENDING`:
    case `${FETCH_GUIDES}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case `${FETCH_GUIDES}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case `${GET_LESSONS}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case `${FETCH_GUIDES}`: {
      return {
        ...state,
        data: guideData,
        isLoading: true,
      };
    }

    case `${GET_LESSONS}`: {
      console.log(GET_LESSONS, lessonData);
      return {
        ...state,
        lessons: lessonData,
        isLoading: true,
      };
    }

    default:
      return state;
  }
}
