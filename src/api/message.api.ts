import axios, { IAxiosResponse } from '@/api';
import { GET, DELETE } from '@/api/decorators';

class MessageApi {
  @GET({
    url: '/message'
  })
  async getMessage(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: '/message'
  })
  async rmMessage(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new MessageApi();
