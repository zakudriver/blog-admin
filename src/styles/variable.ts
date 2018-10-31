import { globalStore } from '@/store';

const { primaryColor, drawerColor } = globalStore.webConfig;
export interface IStyleInterface {
  primaryColor: string;
  drawerColor: string;
}

export const styleVar = {
  primaryColor,
  drawerColor
};
