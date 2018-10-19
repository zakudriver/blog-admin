import axios, { IAxiosResponse } from '@/service';
import { prefix, GET, POST, DELETE, PUT } from '@/service/decorators';

@prefix('/classification')
class ClassificationApi {
  @GET({
    url: ''
  })
  async getClassification(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @POST({
    url: ''
  })
  async addClassification(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: ''
  })
  async removeClassification(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @PUT({
    url: ''
  })
  async updateClassification(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new ClassificationApi();
