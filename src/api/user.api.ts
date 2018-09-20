import axios, { IAxiosResponse } from './index';
import { GET } from './decorators';

class UserServer {

  @GET({
    url: '/message'
  })
  async login(data?: any) {
    const res: IAxiosResponse = await axios(data);
    console.log(11)
    return Promise.resolve(res.data);
  }
}

export default new UserServer();
