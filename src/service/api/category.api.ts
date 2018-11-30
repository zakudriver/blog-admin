import axios, { IAxiosResponse } from '@/service';
import { prefix, GET, POST, DELETE, PUT } from '@/service/decorators';

@prefix('/category')
class CategoryApi {
  @GET({
    url: ''
  })
  async getCategory(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @POST({
    url: ''
  })
  async addCategory(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: ''
  })
  async removeCategory(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @PUT({
    url: ''
  })
  async updateCategory(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new CategoryApi();
