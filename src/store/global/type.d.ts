import { GlobalStore as globalStore } from './index';

export as namespace GlobalStore;

export interface IGlobalStore extends globalStore {}

export interface IConfig {
  logo: string;
  primaryColor: string;
  drawerColor: string;
  title: string;
  drawerWidth: number;
}

export interface IChangeEdit {
  (value: string): void;
}

export interface IChangeDisplay {
  (value: string): void;
}

type Indexes<T> = { [P in keyof T]?: T[P] };
export interface IChangeConfig {
  (value: Indexes<IConfig>): void;
}
