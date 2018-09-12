import { observable, action } from 'mobx'

export class GlobalStore {
  @observable
  webConfig: IGlobalStore.webConfig = {
    headPic: '',
    theme: {
      primaryColor: '#00acc1'
    },
    title: `Welcome, Zyhua's Admin`,
    drawerWidth: 30
  }

  @observable
  isCollapsed: boolean = false

  @action
  onCollapsed = () => {
    this.isCollapsed = !this.isCollapsed
  }
}

export default new GlobalStore()
