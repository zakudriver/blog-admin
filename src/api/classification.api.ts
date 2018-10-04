import axios, { IAxiosResponse } from './index';
import { GET, POST, DELETE } from './decorators';

class ClassificationApi {
  @GET({
    url: '/classification'
  })
  async getClassification(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @POST({
    url: '/classification'
  })
  async addClassification(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: '/classification'
  })
  async removeClassification(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new ClassificationApi();
