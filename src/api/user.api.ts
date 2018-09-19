import Axios from './index';
// import { http } from './decorators';

class UserServer extends Axios {
  constructor(config = {}) {
    super(config);
  }
  // @http({
  //   method: 'get',
  //   url: '/meassage'
  // })
  async login(data: any) {
    const res = await this.http.post('/user/login', data);
    return Promise.resolve(res.data);
  }
}

export default new UserServer();
