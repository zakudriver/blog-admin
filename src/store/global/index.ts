import { observable, action } from 'mobx';

export class GlobalStore {
  @observable
  currentRouter: string = '';
  @observable
  webConfig: GlobalStore.IWebConfig = {
    headPic: '',
    theme: {
      primaryColor: '#1DA57A'
    },
    title: `Welcome, Zyhua's Admin`,
    drawerWidth: 30,
    editorLanguages: ['typescript', 'javascript', 'markdown']
  };

  @observable
  isCollapsed: boolean = false;

  @observable
  selectionEdit: string = 'Monaco';

  @observable
  selectionLanguage: string = 'javascript';

  @observable
  isUploadDisplay: boolean = false;

  constructor() {}

  // 记录路由
  @action
  updateRouter: GlobalStore.IUpdateRouter = route => {
    this.currentRouter = route;
  };

  // 右菜单 缩放
  @action
  onCollapsed = () => {
    this.isCollapsed = !this.isCollapsed;
  };

  // 编辑器选择
  @action
  onChangeEdit: GlobalStore.IOnChangeEdit = value => {
    this.selectionEdit = value;
  };

  // 编辑器语言选择
  @action
  onChangeLanguages: GlobalStore.IOnChangeLanguages = value => {
    this.selectionLanguage = value;
  };

  // 上传模块 on/off
  @action
  onUploadDisplay = () => {
    this.isUploadDisplay = !this.isUploadDisplay;
  };
}

export default new GlobalStore();
