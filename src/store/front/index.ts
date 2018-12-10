import { action, observable, runInAction } from 'mobx';
import { StoreExtends } from '@/utils/extends';

export class FrontStore extends StoreExtends {
  @observable
  frontConfig: FrontStore.IFrontConfig = {
    avatar: '',
    name: '',
    profile: '',
    description: ''
  };

  constructor() {
    super();
    this.init();
  }

  init() {
    this.getFrontConfig();
  }

  @action
  getFrontConfig = async () => {
    const res = await this.configApi$$.getFrontConfig();
    runInAction(() => {
      if (res.code === 0) {
        this.frontConfig = res.data;
      }
    });
  };

  @action
  changeFrontConfig: FrontStore.IChangeFrontConfig = value => {
    const key = Object.keys(value)[0];
    this.frontConfig[key] = value[key];
  };

  @action
  updateFrontConfig: FrontStore.IUpdateFrontConfig = async () => {
    const res = await this.configApi$$.updateFrontConfig(this.frontConfig);
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    });
  };
}

export default new FrontStore();
