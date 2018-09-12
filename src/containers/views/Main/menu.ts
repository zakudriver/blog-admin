import * as Loadable from 'react-loadable'
import { Loading } from '@/components/common'

const handleloadableComponent = (component: () => Promise<any>) =>
  Loadable({
    loader: component,
    loading: Loading
  })

export const loadableComponents = {
  Home: handleloadableComponent(() => import(/* webpackChunkName: "home" */ '@/containers/views/Home')),
  SettingBlog: handleloadableComponent(() =>
    import(/* webpackChunkName: "settingBlog" */ '@/containers/views/Setting/Blog')
  ),
  SettingAdmin: handleloadableComponent(() =>
    import(/* webpackChunkName: "settingAdmin" */ '@/containers/views/Setting/Admin')
  ),
  Editor: handleloadableComponent(() => import(/* webpackChunkName: "editor" */ '@/containers/views/Editor')),
  Message: handleloadableComponent(() => import(/* webpackChunkName: "message" */ '@/containers/views/Message'))
}

// import EditorToolbar from '@/containers/views/Editor/Toolbar'

export const loadableToolbarComponents = {
  EditorToolbar: handleloadableComponent(() =>
    import(/* webpackChunkName: "editorToolbar" */ '@/containers/views/Editor/Toolbar')
  )
}

export type loadableComponentsTypeKeys = keyof typeof loadableComponents
export type loadableToolbarComponentsTypeKeys = keyof typeof loadableToolbarComponents

export interface IMenu {
  key: string
  parentKey?: string
  title: string
  icon: string
  path?: string
  component?: loadableComponentsTypeKeys
  toolbarComponent?: loadableToolbarComponentsTypeKeys
  exact?: boolean
}

export interface IMenuTree extends IMenu {
  children?: IMenu[]
}

export const menu: IMenu[] = [
  {
    key: '1',
    title: 'Home',
    icon: 'home',
    path: '/',
    component: 'Home',
    exact: true
  },
  {
    key: '2',
    title: 'Setting',
    icon: 'setting'
  },
  {
    key: '21',
    parentKey: '2',
    title: 'Blog',
    icon: 'home',
    path: '/setting/blog',
    component: 'SettingBlog',
    exact: true
  },
  {
    key: '22',
    parentKey: '2',
    title: 'Admin',
    icon: 'home',
    path: '/setting/admin',
    component: 'SettingAdmin',
    exact: true
  },
  {
    key: '3',
    title: 'Editor',
    icon: 'edit',
    path: '/editor',
    component: 'Editor',
    toolbarComponent: 'EditorToolbar',
    exact: true
  },
  {
    key: '4',
    title: 'Message',
    icon: 'message',
    path: '/message',
    component: 'Message',
    exact: true
  }
]
