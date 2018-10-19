import axios, { IAxiosResponse } from '@/service';
import { prefix, GET, DELETE } from '@/service/decorators';

@prefix('/message')
class MessageApi {
  @GET({
    url: ''
  })
  async getMessage(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: ''
  })
  async removeMessage(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new MessageApi();
