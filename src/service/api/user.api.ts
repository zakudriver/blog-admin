import axios, { IAxiosResponse } from '@/service';
import { prefix, POST, GET, PUT } from '@/service/decorators';

@prefix('/user')
class UserApi {
  @POST({
    url: '/login'
  })
  async login(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @POST({
    url: '/auth'
  })
  async auth(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @GET({
    url: '/info'
  })
  async getUserInfo(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @PUT({
    url: ''
  })
  async updateUser(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new UserApi();
