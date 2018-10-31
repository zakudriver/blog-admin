import { observable, action } from 'mobx';

export class GlobalStore {
  @observable
  webConfig: GlobalStore.IWebConfig = {
    primaryColor: '#1DA57A',
    // primaryColor: '#eee',
    drawerColor: '#5ee2b9',
    title: `Welcome, Zyhua's Admin`,
    drawerWidth: 30
  };

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

  constructor() {}

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

  @action
  changeWebConfig: GlobalStore.IChangeWebConfig = value => {
    const key = Object.keys(value)[0];
    this.webConfig[key] = value[key];
  };
}

export default new GlobalStore();
