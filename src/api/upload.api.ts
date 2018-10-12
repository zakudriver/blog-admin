import axios, { IAxiosResponse } from './index';
import { POST } from './decorators';

class UploadApi {
  @POST({
    url: 'upload'
  })
  async upload(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new UploadApi();
