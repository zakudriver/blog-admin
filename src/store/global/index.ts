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

  constructor() {}

  @action
  updateRouter: GlobalStore.IUpdateRouter = route => {
    this.currentRouter = route;
  };

  @action
  onCollapsed = () => {
    this.isCollapsed = !this.isCollapsed;
  };

  @action
  onChangeEdit: GlobalStore.IOnChangeEdit = value => {
    this.selectionEdit = value;
  };

  @action
  onChangeLanguages: GlobalStore.IOnChangeLanguages = value => {
    this.selectionLanguage = value;
  };
}

export default new GlobalStore();
