import axios, { IAxiosResponse } from '@/service';
import { prefix, GET, PUT } from '@/service/decorators';

@prefix('/config')
class ConfigApi {
  @GET({
    url: '/admin'
  })
  async getAdminConfig(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @PUT({
    url: '/admin'
  })
  async updateAdminConfig(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @GET({
    url: '/front'
  })
  async getFrontConfig(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @PUT({
    url: '/front'
  })
  async updateFrontConfig(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new ConfigApi();
