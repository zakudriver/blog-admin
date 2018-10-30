import { observable, action, runInAction } from 'mobx';
import { StoreExtends } from '@/utils/extends';
import tokenStore, { TokenStore } from './token';

export class UserStore extends StoreExtends {
  @observable
  userInfo: UserStore.IUserInfo = {
    username: '',
    avatar: '',
    permission: 3
  };

  userInfoForm: UserStore.IUserInfoForm | object = {};

  tokenStore: TokenStore;
  constructor(tStore: TokenStore) {
    super();
    this.tokenStore = tStore;
  }

  init() {
    this.getUserInfo();
  }

  @action
  onLogin: UserStore.IOnLogin = async form => {
    const res = await this.userApi$$.login(form);
    return runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.userInfo = res.data;
        this.userInfoForm = res.data;
        this.tokenStore.changeToken(res.token!);
        return true;
      } else {
        return false;
      }
    });
  };

  @action
  getUserInfo = async () => {
    const res = await this.userApi$$.getUserInfo();
    runInAction(() => {
      if (res.code === 0) {
        this.userInfo = res.data;
        this.userInfoForm = res.data;
      }
    });
  };

  @action
  changeUserInfo: UserStore.IChangeUserInfo = value => {
    const key = Object.keys(value)[0];
    this.userInfoForm[key] = value[key];
  };

  @action
  updateUserInfo = async () => {
    const form = this.userInfoForm as UserStore.IUserInfoForm;

    if ((form.oldPassword && form.newPassword) || (!form.oldPassword && !form.newPassword)) {
      const res = await this.userApi$$.updateUser(this.userInfoForm);
      runInAction(() => {
        if (res.code === 0) {
          this.$message.success(res.msg);
          this.userInfo = res.data;
          this.userInfoForm = {};
        }
      });
    } else {
      if (form.newPassword) {
        this.$message.warning('oldPassword can not be empty');
      } else {
        this.$message.warning('newPassword can not be empty');
      }
    }
  };
}

export default new UserStore(tokenStore);
