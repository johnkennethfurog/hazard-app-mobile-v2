import {Alert} from 'react-native';

import {
  CHECK_IF_LOCATING,
  CHECK_IF_DISASTER_IS_ON,
  START_LOCATING,
  STOP_LOCATING,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  SIGN_IN,
  REGISTER,
  GET_PROFILE,
} from '../actions/types';

const initialState = {
  isLoading: false,
  error: '',
  hazardConfig: {value: false},
  isLocating: false,
  profile: {},
};

export default function concern(state = initialState, action) {
  switch (action.type) {
    case `${SIGN_IN}_REJECTED`:
    case `${REGISTER}_REJECTED`:
    case `${UPDATE_PROFILE}_REJECTED`:
    case `${CHANGE_PASSWORD}_REJECTED`:
    case `${START_LOCATING}_REJECTED`:
    case `${STOP_LOCATING}_REJECTED`:
    case `${CHECK_IF_DISASTER_IS_ON}_REJECTED`:
    case `${CHECK_IF_LOCATING}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case `${SIGN_IN}_PENDING`:
    case `${REGISTER}_PENDING`:
    case `${UPDATE_PROFILE}_PENDING`:
    case `${CHANGE_PASSWORD}_PENDING`:
    case `${START_LOCATING}_PENDING`:
    case `${STOP_LOCATING}_PENDING`:
    case `${CHECK_IF_DISASTER_IS_ON}_PENDING`:
    case `${CHECK_IF_LOCATING}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case `${CHECK_IF_DISASTER_IS_ON}_FULFILLED`: {
      const hazardConfig = action.payload.data.data;
      return {
        ...state,
        hazardConfig,
        isLoading: false,
      };
    }

    case `${START_LOCATING}_FULFILLED`: {
      return {
        ...state,
        isLocating: true,
        isLoading: false,
      };
    }

    case `${STOP_LOCATING}_FULFILLED`: {
      console.log(STOP_LOCATING, STOP_LOCATING);
      return {
        ...state,
        isLocating: false,
        isLoading: false,
      };
    }

    case `${CHECK_IF_LOCATING}_FULFILLED`: {
      const isLocating = action.payload.data.data;
      return {
        ...state,
        isLocating,
        isLoading: false,
      };
    }

    case `${CHANGE_PASSWORD}_FULFILLED`: {
      const message = action.payload.data.message;
      Alert.alert(message);
      return {
        ...state,
        isLoading: false,
      };
    }

    case `${UPDATE_PROFILE}_FULFILLED`: {
      const message = action.payload.data.message;
      const profile = action.payload.data.data;
      console.log(UPDATE_PROFILE, profile);
      Alert.alert(message);
      return {
        ...state,
        profile,
        isLoading: false,
      };
    }

    case `${SIGN_IN}_FULFILLED`: {
      const profile = action.payload.data.data.userInfo;
      return {
        ...state,
        profile,
        isLoading: false,
      };
    }

    case `${REGISTER}_FULFILLED`: {
      const profile = action.payload.data.data.userInfo;
      return {
        ...state,
        profile,
        isLoading: false,
      };
    }

    case `${GET_PROFILE}`: {
      const profile = action.payload;
      return {
        ...state,
        profile,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}
