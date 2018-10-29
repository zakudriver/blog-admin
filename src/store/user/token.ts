import { observable, action } from 'mobx';
import { TokenField } from '@/constants';

export class TokenStore {
  @observable
  token = 'Bearer ' + localStorage.getItem(TokenField) || '';

  @action
  changeToken = (token: string) => {
    this.token = 'Bearer ' + token;
    localStorage.setItem(TokenField, token);
  };
}

export default new TokenStore();
