import { observable } from 'mobx';

export class UserStore {
  @observable
  public test = 'btn';
}

export default new UserStore();
