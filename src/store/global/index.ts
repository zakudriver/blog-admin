import { observable, action } from 'mobx'

export class GlobalStore {
  @observable
  webConfig: IGlobalStore.IWebConfig = {
    headPic: '',
    theme: {
      primaryColor: '#1DA57A'
    },
    title: `Welcome, Zyhua's Admin`,
    drawerWidth: 30,
    editorLanguages: ['typescript', 'javascript', 'markdown']
  }

  @observable
  isCollapsed: boolean = false

  @observable
  selectionEdit: string = 'Monaco'

  @observable
  selectionLanguage: string = 'javascript'

  @action
  onCollapsed = () => {
    this.isCollapsed = !this.isCollapsed
  }

  @action
  onChangeEdit: IGlobalStore.IOnChangeEdit = value => {
    this.selectionEdit = value
  }

  @action
  onChangeLanguages: IGlobalStore.IOnChangeLanguages = value => {
    this.selectionLanguage = value
  }
}

export default new GlobalStore()
