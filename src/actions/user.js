import SInfo from 'react-native-sensitive-info';

import {hazardApiRequest, hazardAuthorizeApiRequest} from '../client/client';
import {
  TOKEN,
  USER_INFO,
  CHECK_IF_LOCATING,
  CHECK_IF_DISASTER_IS_ON,
  START_LOCATING,
  STOP_LOCATING,
  CHANGE_PASSWORD,
} from './types';
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

export const checkIfNeedToChangePass = callBack => {
  SInfo.getItem(USER_INFO, {}).then(user => {
    user = JSON.parse(user);
    callBack(user.passwordIsGenerated);
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

export const locateMe = location => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: START_LOCATING,
        payload: hazardAuthorizeApiRequest(token).post(
          '/citizen/locate',
          location,
        ),
      });
    })
    .catch(err => {});
};

export const stopLocating = () => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: STOP_LOCATING,
        payload: hazardAuthorizeApiRequest(token).post(
          '/citizen/locate/stop',
          {},
        ),
      });
    })
    .catch(err => {});
};

export const checkIfLocatingIsActive = () => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: CHECK_IF_DISASTER_IS_ON,
        payload: hazardAuthorizeApiRequest(token).get('/config/DISASTER_ON'),
      });
    })
    .catch(err => {});
};

export const checkifUserIsLocating = () => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: CHECK_IF_LOCATING,
        payload: hazardAuthorizeApiRequest(token).get('/citizen/locate/check'),
      });
    })
    .catch(err => {});
};

export const changePassword = (password, oldPass, callBack) => dispatch => {
  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: CHANGE_PASSWORD,
        payload: hazardAuthorizeApiRequest(token)
          .put('/citizen/changepassword', {
            password,
            oldPass,
          })
          .then(rspns => {
            SInfo.getItem(USER_INFO, {}).then(userInfo => {
              userInfo = JSON.parse(userInfo);
              userInfo.passwordIsGenerated = false;
              SInfo.setItem(USER_INFO, JSON.stringify(userInfo), {});
              callBack();
            });
            return rspns;
          }),
      });
    })
    .catch(err => {});
};
