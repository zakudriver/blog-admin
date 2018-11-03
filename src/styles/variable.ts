import { globalStore } from '@/store';

const { primaryColor, drawerColor } = globalStore.config;
export interface IStyleInterface {
  primaryColor?: string;
  drawerColor?: string;
}

export const styleVar = {
  primaryColor,
  drawerColor
};
