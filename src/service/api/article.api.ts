import axios, { IAxiosResponse } from '@/service';
import { prefix, POST, GET, DELETE, PUT } from '@/service/decorators';

@prefix('/article')
class ArticleApi {
  @POST({
    url: ''
  })
  async addArticle(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @GET({
    url: '/pro'
  })
  async getArticle(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @GET({
    url: '/listpro'
  })
  async getArticleList(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: ''
  })
  async removeArticle(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @PUT({
    url: ''
  })
  async updateArticle(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new ArticleApi();
