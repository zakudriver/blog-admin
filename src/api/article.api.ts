import axios, { IAxiosResponse } from './index';
import { POST, GET, DELETE, PUT } from './decorators';

class ArticleApi {
  @POST({
    url: '/article'
  })
  async addArticle(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @GET({
    url: '/article'
  })
  async getArticle(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @GET({
    url: '/article/listpro'
  })
  async getArticleList(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: '/article'
  })
  async removeArticle(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @PUT({
    url: '/article'
  })
  async updateArticle(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new ArticleApi();
