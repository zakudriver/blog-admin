import axios, { AxiosInstance } from 'axios';

const API = APP_ENV === 'dev' ? 'http://127.0.0.1:8999' : '';

export default class Axios {
  http: AxiosInstance;
  constructor(config = {}) {
    this.http = axios.create(Object.assign(config, { baseURL: API }));

    this.http.interceptors.request.use(
      conf => {
        conf.headers.Authorization = 'Bearer ' + localStorage.get('access_Token') || '';
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );

    this.http.interceptors.response.use(
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
  }
}
