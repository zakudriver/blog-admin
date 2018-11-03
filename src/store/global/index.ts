import { observable, action, runInAction } from 'mobx';
import { StoreExtends } from '@/utils/extends';

export class GlobalStore extends StoreExtends {
  @observable
  config: GlobalStore.IConfig = {
    primaryColor: '#1da57a',
    drawerColor: '#5ee2b9',
    title: `Welcome, Zyhua's Admin`,
    drawerWidth: 30
  };

  @observable
  isSpin: boolean = false;

  @observable
  editorLanguages: string[] = ['markdown', 'typescript', 'javascript', 'go'];

  @observable
  isCollapsed: boolean = false;

  @observable
  selectionEdit: string = 'Monaco';

  @observable
  selectionLanguage: string = 'javascript';

  @observable
  isUploadDisplay: boolean = false;

  constructor() {
    super();
    this.init();
  }

  init() {
    this.getConfig();
  }

  @action
  getConfig = async () => {
    const res = await this.configApi$$.getConfig();
    runInAction(() => {
      if (res.code === 0) {
        this.config = res.data;
        window.less.modifyVars({
          '@primary-color': res.data.primaryColor || '#1da57a'
        });
      }
    });
  };

  // 右菜单 缩放
  @action
  onCollapsed = () => {
    this.isCollapsed = !this.isCollapsed;
  };

  // 编辑器选择
  @action
  changeEdit: GlobalStore.IChangeEdit = value => {
    this.selectionEdit = value;
  };

  // 编辑器语言选择
  @action
  changeLanguages: GlobalStore.IChangeLanguages = value => {
    this.selectionLanguage = value;
  };

  // 上传模块 on/off
  @action
  uploadDisplay: GlobalStore.IUploadDisplay = value => {
    this.isUploadDisplay = value === true || value === false ? value : !this.isUploadDisplay;
  };

  // 改变配置
  @action
  changeConfig: GlobalStore.IChangeConfig = value => {
    const key = Object.keys(value)[0];
    this.config[key] = value[key];
  };

  @action
  updateConfig = async () => {
    const res = await this.configApi$$.updateConfig(this.config);
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
      }
    });
  };
}

export default new GlobalStore();
