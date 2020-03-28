import SInfo from 'react-native-sensitive-info';

import {hazardApiRequest, hazardAuthorizeApiRequest} from '../client/client';
import {TOKEN, USER_INFO} from './types';
import {isUndefined} from 'lodash';

export const checkIfSignIn = callback => {
  SInfo.getItem(TOKEN, {}).then(token => {
    callback(!isUndefined(token));
  });
};

export const signOut = callback => {
  SInfo.deleteItem(TOKEN, {}).then(() => {
    callback();
  });
};

export const signin = (payload, callback) => {
  console.log('payload', payload);
  hazardApiRequest()
    .post('/citizen/signin', payload)
    .then(rspns => {
      const {token, userInfo} = rspns.data.data;
      console.log('token', token);
      SInfo.setItem(TOKEN, token, {}).then(() => {
        SInfo.setItem(USER_INFO, JSON.stringify(userInfo), {});
        callback();
      });
    })
    .catch(err => {
      console.log('err', err);
    });
};

export const locateMe = (location, errorCallback) => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      hazardAuthorizeApiRequest(token)
        .post('/citizen/locate', location)
        .then(x => {
          console.log('sucess');
        })
        .catch(err => {
          console.log('locateMe error', err);
          errorCallback();
        });
    })
    .catch(err => {});
};

export const stopLocating = errorCallback => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      hazardAuthorizeApiRequest(token)
        .post('/citizen/locate/stop', {})
        .then(x => {
          console.log('sucess');
        })
        .catch(err => {
          console.log('locateMe error', err);
          errorCallback();
        });
    })
    .catch(err => {});
};

export const register = (payload, callback) => {
  hazardApiRequest()
    .post('/citizen/register', payload)
    .then(rspns => {
      const {token, userInfo} = rspns.data.data;
      console.log('token', token);
      SInfo.setItem(TOKEN, token, {}).then(() => {
        SInfo.setItem(USER_INFO, JSON.stringify(userInfo), {});
        callback();
      });
    })
    .catch(err => {});
};
