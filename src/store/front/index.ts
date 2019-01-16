import { action, observable, runInAction } from 'mobx';
import immer from 'immer';
import { StoreExtends } from '@/utils/extends';

export class FrontStore extends StoreExtends {
  @observable
  frontConfig: FrontStore.IFrontConfig = {
    avatar: '',
    name: '',
    profile: '',
    description: '',
    cover: {
      home: '',
      blog: ''
    },
    defaultThumb: []
  };

  init() {
    this.getFrontConfig();
  }

  @action
  getFrontConfig = async () => {
    const res = await this.configApi$$.getFrontConfig();
    runInAction(() => {
      if (res.code === 0 && res.data) {
        res.data.defaultThumb = res.data.defaultThumb.map((i: any, idx: any) => ({
          uid: idx,
          name: i,
          url: i,
          key: idx
        }));
        this.frontConfig = res.data;
      }
    });
  };

  @action
  changeFrontConfig: FrontStore.IChangeFrontConfig = value => {
    const key = Object.keys(value)[0];
    this.frontConfig[key] = value[key];
  };

  updateFrontConfig: FrontStore.IUpdateFrontConfig = () => {
    const config = immer(this.frontConfig, draft => {
      delete draft.cover;
      delete draft.defaultThumb;
    });
    console.log(config);
    this._updateFront(config);
  };

  @action
  changeCover: FrontStore.IChangeCover = value => {
    const key = Object.keys(value)[0];
    this.frontConfig.cover[key] = value[key];
  };

  @action
  changeDefaultThumb: FrontStore.IChangeDefaultThumb = value => {
    console.log(value);
    this.frontConfig.defaultThumb = value;
  };

  updateFrontCover = () => {
    const config = immer(this.frontConfig, draft => {
      delete draft.avatar;
      delete draft.description;
      delete draft.name;
      delete draft.profile;
      delete draft.defaultThumb;
    });
    console.log(config);
    this._updateFront(config);
  };

  updateFrontDefaultThumb = () => {
    const config = immer(this.frontConfig, draft => {
      delete draft.avatar;
      delete draft.description;
      delete draft.name;
      delete draft.profile;
      delete draft.cover;
      draft.defaultThumb = draft.defaultThumb.map(i => i.url);
    });
    console.log(config);
    this._updateFront(config);
  };

  private _updateFront = async (config: { [i: string]: any }) => {
    const res = await this.configApi$$.updateFrontConfig(config);
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
