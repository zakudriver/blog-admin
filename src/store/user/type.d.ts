import { UserStore as userStore } from './index';

export as namespace UserStore;

export interface IUserStore extends userStore {}

export interface IUserInfo {
  _id?: string;
  username: string;
  permission: number;
  avatar: string;
  key?: string | number;
}

export interface IOnLogin {
  (form: { username: string; password: string }): Promise<boolean>;
}

export interface IUserInfoForm extends IUserInfo {
  oldPassword: string;
  newPassword: string;
}

export interface IChangeToken {
  (token: string): void;
}

type Indexes<T> = { [P in keyof T]?: T[P] };
export interface IChangeUserInfo {
  (value: Indexes<IUserInfo>): void;
}
