import { observable, action, runInAction } from 'mobx';
import { StoreExtends } from '@/utils/extends';
import tokenStore, { TokenStore } from './token';

export class UserStore extends StoreExtends {
  @observable
  userInfo: UserStore.IUserInfo = {
    username: '',
    permission: 0
  };

  tokenStore: TokenStore;
  constructor(tStore: TokenStore) {
    super();
    this.tokenStore = tStore;
  }

  @action
  onLogin: UserStore.IOnLogin = async form => {
    const res = await this.userApi$$.login(form);
    return runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.userInfo = res.data;
        this.tokenStore.changeToken(res.token!);
        return true;
      } else {
        return false;
      }
    });
  };
}

export default new UserStore(tokenStore);
