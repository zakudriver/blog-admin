import axios, { IAxiosResponse } from '@/service';
import { prefix, GET, PUT } from '@/service/decorators';

@prefix('/config/admin')
class ConfigApi {
  @GET({
    url: ''
  })
  async getConfig(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @PUT({
    url: ''
  })
  async updateConfig(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new ConfigApi();
