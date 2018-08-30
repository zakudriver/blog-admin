import { GlobalStore as globalStore } from './index';

export as namespace IGlobalStore;

export interface GlobalStore extends globalStore {}

export interface webConfig {
  headPic: string;
  theme: {
    primaryColor: string;
  };
  title: string;
  drawerWidth: number;
}
