import { GlobalStore as globalStore } from './index'
import { StyledComponentClass } from 'styled-components'

export as namespace IGlobalStore

export interface GlobalStore extends globalStore {}

export interface IWebConfig {
  headPic: string
  theme: {
    primaryColor: string
  }
  title: string
  drawerWidth: number
  editorLanguages: string[]
}

export interface IOnChangeEdit {
  (value: string): void
}

export interface IOnChangeLanguages {
  (value: string): void
}
