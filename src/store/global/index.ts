import { observable } from 'mobx';

export class GlobalStore {
  @observable
  public webConfig: IGlobalStore.webConfig = {
    headPic: '',
    theme: {
      primaryColor: '#00acc1'
    },
    title: `Welcome, Zyhua's Admin`,
    drawerWidth: 30
  };
}

export default new GlobalStore();
