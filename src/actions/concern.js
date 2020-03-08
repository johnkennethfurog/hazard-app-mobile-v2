import axios from 'axios';
import {hazardApiRequest} from '../client/client';

import {
  REPORT_CONCERN,
  GET_CONCERNS,
  GET_BARANGAYS,
  GET_CONCERN_TYPES,
  UPLOAD_PHOTO,
} from './types';

export const reportConcern = (payload, callback) => dispatch => {
  payload.citizen = '5e6354a319f1765cbc164682';
  console.log('payload', payload);
  dispatch({
    type: REPORT_CONCERN,
    payload: hazardApiRequest()
      .post('/concern/new', payload)
      .then(rspns => {
        callback();

        return rspns;
      }),
  });
};

export const getConcerns = () => dispatch => {
  const citizenId = '5e6354a319f1765cbc164682';
  dispatch({
    type: GET_CONCERNS,
    payload: hazardApiRequest().get('/concern/' + citizenId),
  });
};

export const getConcernTypes = () => dispatch => {
  dispatch({
    type: GET_CONCERN_TYPES,
    payload: hazardApiRequest()
      .get('/concern/concerntype')
      .then(rspns => {
        rspns.data.data = rspns.data.data.map(type => {
          return {label: type.name, value: type._id};
        });
        return rspns;
      }),
  });
};

export const getBarangays = () => dispatch => {
  dispatch({
    type: GET_BARANGAYS,
    payload: hazardApiRequest()
      .get('/agent/get/barangay')
      .then(rspns => {
        rspns.data.data = rspns.data.data.map(type => {
          return {label: type.name, value: type._id};
        });
        return rspns;
      }),
  });
};

export const uploadPhoto = photo => dispatch => {
  const data = new FormData();
  data.append('photo', {
    name: '',
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  console.log('data', data);

  dispatch({
    type: UPLOAD_PHOTO,
    payload: hazardApiRequest().post('/file/upload-photo', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }),
  });
};
