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
}
