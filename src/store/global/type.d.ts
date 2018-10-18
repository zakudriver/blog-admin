import { GlobalStore as globalStore } from './index';

export as namespace GlobalStore;

export interface IGlobalStore extends globalStore {}

export interface IWebConfig {
  headPic: string;
  theme: {
    primaryColor: string;
  };
  title: string;
  drawerWidth: number;
  editorLanguages: string[];
}

export interface IChangeToken {
  (token: string): void;
}

export interface IOnChangeEdit {
  (value: string): void;
}

export interface IOnChangeLanguages {
  (value: string): void;
}

export interface IOnUploadDisplay {
  (value?: boolean): void;
}
