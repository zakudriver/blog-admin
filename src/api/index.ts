import http, { AxiosResponse } from 'axios';

const API = APP_ENV === 'dev' ? 'http://127.0.0.1:8999' : '';

const config = {};

const axios = http.create(Object.assign(config, { baseURL: API }));

axios.interceptors.request.use(
  conf => {
    conf.headers.Authorization = 'Bearer ' + localStorage.getItem('access_Token') || '';
    return conf;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;

interface IResponse {
  code: number;
  msg: string;
  data: any;
  time: number;
}

export interface IAxiosResponse extends AxiosResponse<IResponse> {}
