import { globalStore } from '@/store';

const { theme } = globalStore.webConfig;

export interface IStyleInterface {
  primaryColor: string;
  drawerColor: string;
}

export const styleVar = {
  primaryColor: theme.primaryColor,
  drawerColor: theme.drawerColor
};
