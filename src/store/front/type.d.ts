import { FrontStore as frontStore } from './index';

export as namespace FrontStore;

export interface IFrontStore extends frontStore {}

export interface IFrontConfig {
  avatar: string;
  name: string;
  profile: string;
  description: string;
  cover: ICover;
  defaultThumb: any[];
  _id?: string;
}

export interface ICover {
  home: string;
  blog: string;
}

export interface IUpdateFrontConfig {
  (): void;
}

type Indexes<T> = { [P in keyof T]?: T[P] };
export interface IChangeFrontConfig {
  (value: Indexes<IFrontConfig>): void;
}

export interface IChangeCover {
  (value: { [i: string]: any }): void;
}

export interface IChangeDefaultThumb {
  (value: any[]): void;
}
