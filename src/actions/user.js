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
  UPDATE_PROFILE,
  SIGN_IN,
  REGISTER,
  GET_PROFILE,
} from './types';
import {isUndefined} from 'lodash';

export const checkIfSignIn = callback => {
  SInfo.getItem(TOKEN, {}).then(token => {
    callback(token);
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

export const signin = (payload, callback) => dispatch => {
  dispatch({
    type: SIGN_IN,
    payload: hazardApiRequest()
      .post('/citizen/signin', payload)
      .then(rspns => {
        const {token, userInfo} = rspns.data.data;
        SInfo.setItem(TOKEN, token, {}).then(() => {
          SInfo.setItem(USER_INFO, JSON.stringify(userInfo), {});
          callback();
        });

        return rspns;
      }),
  });
};

export const register = (payload, callback) => dispatch => {
  payload.mobileNumber = '+63' + payload.mobileNumber;
  dispatch({
    type: REGISTER,
    payload: hazardApiRequest()
      .post('/citizen/register', payload)
      .then(rspns => {
        if (rspns.data) {
          const {token, userInfo} = rspns.data.data;

          SInfo.setItem(TOKEN, token, {}).then(() => {
            SInfo.setItem(USER_INFO, JSON.stringify(userInfo), {});
            callback();
          });
        }

        return rspns;
      }),
  });
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

export const getProfile = () => dispatch => {
  SInfo.getItem(USER_INFO, {})
    .then(profile => {
      dispatch({
        type: GET_PROFILE,
        payload: JSON.parse(profile),
      });
    })
    .catch(err => {});
};

export const updateProfile = ({
  name,
  email,
  barangay,
  address,
  mobileNumber,
}) => dispatch => {
  mobileNumber = '+63' + mobileNumber;
  const payload = {
    name,
    email,
    barangay,
    address,
    mobileNumber,
  };

  console.log('payload', payload);

  SInfo.getItem(TOKEN, {})
    .then(token => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: hazardAuthorizeApiRequest(token)
          .put('/citizen/updateprofile', payload)
          .then(rspns => {
            SInfo.setItem(USER_INFO, JSON.stringify(rspns.data.data), {});
            return rspns;
          }),
      });
    })
    .catch(err => {});
};
