import axios, { IAxiosResponse } from './index';
import { POST } from './decorators';

class UserApi {
  @POST({
    url: '/user/login'
  })
  async login(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @POST({
    url: '/user/auth'
  })
  async auth(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new UserApi();
