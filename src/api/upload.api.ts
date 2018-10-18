import axios, { IAxiosResponse } from './index';
import { POST, DELETE } from './decorators';

class UploadApi {
  @POST({
    url: '/upload'
  })
  async uploadFile(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: '/upload'
  })
  async removeFile(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new UploadApi();
