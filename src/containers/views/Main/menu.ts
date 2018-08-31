import * as _ from 'lodash';

import * as Loadable from 'react-loadable';
import { Loading } from '@/components';

const handleloadableComponent = (component: () => Promise<any>) =>
  Loadable({
    loader: component,
    loading: Loading
  });

export const loadableComponents = {
  Home: handleloadableComponent(() => import(/* webpackChunkName: "home" */ '@/containers/views/Home')),
  SettingBlog: handleloadableComponent(() => import(/* webpackChunkName: "home" */ '@/containers/views/Setting/Blog')),
  SettingAdmin: handleloadableComponent(() => import(/* webpackChunkName: "home" */ '@/containers/views/Setting/Admin'))
};

export type loadableComponentsTypeKeys = keyof typeof loadableComponents;

interface IMenu {
  relation: string;
  title: string;
  icon: string;
  path?: string;
  component?: loadableComponentsTypeKeys;
  exact?: boolean;
}

export const menu: IMenu[] = [
  {
    relation: '1',
    title: 'Home',
    icon: 'home',
    path: '/',
    component: 'Home',
    exact: true
  }
];
