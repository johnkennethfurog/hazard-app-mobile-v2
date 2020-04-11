import axios from 'axios';
import SInfo from 'react-native-sensitive-info';

import {hazardApiRequest, hazardAuthorizeApiRequest} from '../client/client';
import {
  REPORT_CONCERN,
  GET_CONCERNS,
  GET_BARANGAYS,
  GET_CONCERN_TYPES,
  UPLOAD_PHOTO,
  TOKEN,
} from './types';

export const reportConcern = (payload, callback) => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: REPORT_CONCERN,
        payload: hazardAuthorizeApiRequest(token)
          .post('/concern/new', payload)
          .then(rspns => {
            callback();

            return rspns;
          }),
      });
    })
    .catch(err => {});
};

export const getConcerns = () => dispatch => {
  SInfo.getItem(TOKEN, {}).then(token => {
    dispatch({
      type: GET_CONCERNS,
      payload: hazardAuthorizeApiRequest(token).get('/concern/'),
    }).catch(err => {});
  });
};

export const getConcernTypes = () => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: GET_CONCERN_TYPES,
        payload: hazardAuthorizeApiRequest(token)
          .get('/concern/concerntype')
          .then(rspns => {
            rspns.data.data = rspns.data.data.map(type => {
              return {label: type.name, value: type._id};
            });
            return rspns;
          }),
      });
    })
    .catch(err => {});
};

export const getBarangays = callback => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: GET_BARANGAYS,
        payload: hazardAuthorizeApiRequest(token)
          .get('/agent/get/barangay')
          .then(rspns => {
            rspns.data.data = rspns.data.data.map(type => {
              return {label: type.name, value: type._id};
            });

            if (callback) {
              callback();
            }

            return rspns;
          }),
      });
    })
    .catch(err => {});
};

export const uploadPhoto = photo => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      const data = new FormData();
      data.append('photo', {
        name: 'photo',
        type: 'image/*',
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      });

      console.log('data', data);
      dispatch({
        type: UPLOAD_PHOTO,
        payload: hazardAuthorizeApiRequest(token)
          .post('/service/upload-photo', data, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          })
          .catch(error => {
            console.log('upload error', error);
          }),
      });
    })
    .catch(err => {});
};
