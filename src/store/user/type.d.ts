import { UserStore as userStore } from './index';

export as namespace UserStore;

export interface IUserStore extends userStore {}

export interface IUserInfo {
  username: string;
  permission: number;
  avatar?: string;
}

export interface IOnLogin {
  (form: { username: string; password: string }): Promise<boolean>;
}

export interface IChangeToken {
  (token: string): void;
}
