import { observable, action, reaction, autorun } from 'mobx';

export class GlobalStore {
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

  constructor() {
    reaction(
      () => this.isCollapsed,
      (val, val1) => {
        console.log('change');
        console.log(val);
        console.log(val1);
      }
    );

    autorun(() => {
      console.log(this.isCollapsed);
    });
  }

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
