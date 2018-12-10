import * as Loadable from 'react-loadable';
import { Loading } from '@/components/common';

const handleloadableComponent = (component: () => Promise<any>) =>
  Loadable({
    loader: component,
    loading: Loading
  });

const handleloadableToolbarComponent = (component: () => Promise<any>) =>
  Loadable({
    loader: component,
    loading: () => null
  });

export const loadableComponents = {
  Home: handleloadableComponent(() => import(/* webpackChunkName: "home" */ '@/containers/views/Home')),
  SettingFront: handleloadableComponent(() => import(/* webpackChunkName: "settingFront" */ '@/containers/views/Setting/Front')),
  SettingAdmin: handleloadableComponent(() => import(/* webpackChunkName: "settingAdmin" */ '@/containers/views/Setting/Admin')),
  Editor: handleloadableComponent(() => import(/* webpackChunkName: "editor" */ '@/containers/views/Editor')),
  Message: handleloadableComponent(() => import(/* webpackChunkName: "message" */ '@/containers/views/Message')),
  Article: handleloadableComponent(() => import(/* webpackChunkName: "article" */ '@/containers/views/Article'))
};

// import EditorToolbar from '@/containers/views/Editor/Toolbar'

export const loadableToolbarComponents = {
  EditorToolbar: handleloadableToolbarComponent(() =>
    import(/* webpackChunkName: "editorToolbar" */ '@/containers/views/Editor/Toolbar')
  ),
  ArticleToolbar: handleloadableToolbarComponent(() =>
    import(/* webpackChunkName: "articleToolbar" */ '@/containers/views/Article/Toolbar')
  ),
  SettingAdminToolbar: handleloadableToolbarComponent(() =>
    import(/* webpackChunkName: "settingAdminToolbar" */ '@/containers/views/Setting/Admin/Toolbar')
  ),
  SettingFrontToolbar: handleloadableToolbarComponent(() =>
    import(/* webpackChunkName: "settingAdminToolbar" */ '@/containers/views/Setting/Front/Toolbar')
  )
};

export type loadableComponentsTypeKeys = keyof typeof loadableComponents;
export type loadableToolbarComponentsTypeKeys = keyof typeof loadableToolbarComponents;

export interface IMenu {
  key: string;
  parentKey?: string;
  title: string;
  icon: string;
  path?: string;
  component?: loadableComponentsTypeKeys;
  toolbarComponent?: loadableToolbarComponentsTypeKeys;
  exact?: boolean;
  children?: any[];
}

export interface IMenuTree extends IMenu {
  children?: IMenu[];
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
    title: 'Editor',
    icon: 'edit',
    path: '/editor',
    component: 'Editor',
    toolbarComponent: 'EditorToolbar',
    exact: true
  },
  {
    key: '3',
    title: 'Article',
    icon: 'home',
    path: '/article',
    component: 'Article',
    toolbarComponent: 'ArticleToolbar',
    exact: true
  },
  {
    key: '4',
    title: 'Message',
    icon: 'message',
    path: '/message',
    component: 'Message',
    exact: true
  },
  {
    key: '5',
    title: 'Setting',
    icon: 'setting',
    children: []
  },
  {
    key: '51',
    parentKey: '5',
    title: 'Front',
    icon: 'home',
    path: '/setting/front',
    component: 'SettingFront',
    toolbarComponent: 'SettingFrontToolbar',
    exact: true
  },
  {
    key: '52',
    parentKey: '5',
    title: 'Admin',
    icon: 'home',
    path: '/setting/admin',
    component: 'SettingAdmin',
    toolbarComponent: 'SettingAdminToolbar',
    exact: true
  }
];
