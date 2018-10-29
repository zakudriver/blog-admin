import { observable, action } from 'mobx';

export class GlobalStore {
  @observable
  webConfig: GlobalStore.IWebConfig = {
    theme: {
      primaryColor: '#1DA57A',
      drawerColor:'#5ee2b9'
    },
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
  onUploadDisplay: GlobalStore.IOnUploadDisplay = value => {
    this.isUploadDisplay = value === true || value === false ? value : !this.isUploadDisplay;
  };
}

export default new GlobalStore();
