import {Alert} from 'react-native';

import {
  GET_CONCERNS,
  REPORT_CONCERN,
  GET_CONCERN_TYPES,
  GET_BARANGAYS,
  UPLOAD_PHOTO,
} from '../actions/types';

const initialState = {
  isLoading: false,
  isLoadingBarangay: false,
  isLoadingConcernType: false,
  concerns: [],
  concernTypes: [],
  barangays: [],
  error: '',
  uploadedPhoto: null,
};

export default function concern(state = initialState, action) {
  switch (action.type) {
    case `${GET_CONCERN_TYPES}_REJECTED`: {
      return {
        ...state,
        isLoadingConcernType: false,
      };
    }
    case `${GET_BARANGAYS}_REJECTED`: {
      return {
        ...state,
        isLoadingBarangay: false,
      };
    }

    case `${UPLOAD_PHOTO}_REJECTED`:
    case `${REPORT_CONCERN}_REJECTED`:
    case `${GET_CONCERNS}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case `${UPLOAD_PHOTO}_PENDING`:
    case `${REPORT_CONCERN}_PENDING`:
    case `${GET_CONCERNS}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case `${GET_CONCERN_TYPES}_PENDING`: {
      return {
        ...state,
        isLoadingConcernType: true,
      };
    }

    case `${GET_BARANGAYS}_PENDING`: {
      return {
        ...state,
        isLoadingBarangay: true,
      };
    }

    case `${GET_CONCERN_TYPES}_FULFILLED`: {
      const concernTypes = action.payload.data.data;
      return {
        ...state,
        concernTypes,
        isLoadingConcernType: false,
      };
    }

    case `${GET_BARANGAYS}_FULFILLED`: {
      const barangays = action.payload.data.data;
      return {
        ...state,
        barangays,
        isLoadingBarangay: false,
      };
    }

    case `${GET_CONCERNS}_FULFILLED`: {
      const concerns = action.payload.data.data;
      return {
        ...state,
        concerns,
        isLoading: false,
      };
    }

    case `${REPORT_CONCERN}_FULFILLED`: {
      const concern = action.payload.data.data;
      state.concerns.push(concern);
      return {
        ...state,
        uploadedPhoto: null,
        isLoading: false,
      };
    }

    case `${UPLOAD_PHOTO}_FULFILLED`: {
      const uploadedPhoto = action.payload.data.data;
      console.log(UPLOAD_PHOTO, action.payload.data);

      return {
        ...state,
        uploadedPhoto,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}
