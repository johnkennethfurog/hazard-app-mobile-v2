import axios from 'axios';
import {isNull, isEmpty} from 'lodash';

const BASE_URL = 'https://hazard-backend.herokuapp.com';
const API_VERSION = '/v1';
const baseURL = BASE_URL + API_VERSION;

const getUrl = url => {
  return `${baseURL}${url}`;
};

const getAxiosClient = async (
  token = null,
  method,
  url,
  options,
  data,
  params,
) => {
  const axiosSetup = {
    headers: {
      Authorization: isNull(token) ? '' : `Bearer ${token}`,
    },
    timeout: 120000,
  };

  if (!isEmpty(params)) {
    axiosSetup.params = params;
  }

  const axiosInstance = axios.create(axiosSetup);

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      throw error;
    },
  );

  const requestUrl = getUrl(url);

  if (data) {
    return axiosInstance[method](requestUrl, data, options);
  }
  return axiosInstance[method](requestUrl, options);
};

export const hazardAuthorizeApiRequest = token => {
  return {
    get: (url, options = {}, params = {}) =>
      getAxiosClient(token, 'get', url, options, null, params),
    post: (url, data, options = {}) =>
      getAxiosClient(token, 'post', url, options, data),
    put: (url, data, options = {}) =>
      getAxiosClient(token, 'put', url, options, data),
    delete: (url, data, options = {}) =>
      getAxiosClient(token, 'delete', url, options, data),
  };
};

export const hazardApiRequest = () => {
  return {
    get: (url, options = {}, params = {}) =>
      getAxiosClient(null, 'get', url, options, null, params),
    post: (url, data, options = {}) =>
      getAxiosClient(null, 'post', url, options, data),
    put: (url, data, options = {}) =>
      getAxiosClient(null, 'put', url, options, data),
    delete: (url, data, options = {}) =>
      getAxiosClient(null, 'delete', url, options, data),
  };
};
