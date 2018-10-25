import axios, { IAxiosResponse } from '@/service';
import { prefix, POST } from '@/service/decorators';

@prefix('/root')
class RootApi {
  @POST({
    url: ''
  })
  async addRoot(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new RootApi();
