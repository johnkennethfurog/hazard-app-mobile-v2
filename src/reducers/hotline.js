import {GET_HOTLINES} from '../actions/types';

const initialState = {
  isLoading: false,
  hotlines: [],
  error: '',
};

export default function guides(state = initialState, action) {
  switch (action.type) {
    case `${GET_HOTLINES}_ERROR`: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case `${GET_HOTLINES}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case `${GET_HOTLINES}_FULFILLED`: {
      const hotlines = action.payload.data;
      console.log('lessons', hotlines);
      return {
        hotlines,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}
