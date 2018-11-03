import http, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { autorun } from 'mobx';
import { message } from 'antd';
import tokenStore from '@/store/user/token';
import history from '@/utils/history';

export const API = APP_ENV === 'dev' ? 'http://127.0.0.1:8999' : '';

const config: AxiosRequestConfig = {};
config.baseURL = API;

const token = { key: '' };

autorun(() => {
  token.key = tokenStore.token;
});

const axios: AxiosInstance = http.create(config);

axios.interceptors.request.use(
  conf => {
    conf.headers.Authorization = token.key;
    return conf;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        return Promise.resolve(res);
      } else {
        handleStatusCode(res.data);
        return Promise.resolve(res);
      }
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;

export interface IResponse {
  code: number;
  msg: string;
  data: any;
  token?: string;
}

export interface IAxiosResponse extends AxiosResponse<IResponse> {}

// 返回状态码处理
function handleStatusCode(res: IResponse) {
  switch (res.code) {
    case 3:
      message.warning(res.msg, 5);
      break;

    case 110:
      message.error(res.msg, 4, () => {
        // location.href = '/login';
        history.push('/login');
      });
      break;

    case 10086:
      message.warning(res.msg, 0);
      break;

    default:
      message.error(res.msg);
      break;
  }
}
