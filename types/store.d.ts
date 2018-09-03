import { RouterStore as _RouterStore } from 'mobx-react-router';

declare global {
  interface RouterStore extends _RouterStore {}

  interface IStore {
    userStore: IUserStore.UserStore;
    globalStore: IGlobalStore.GlobalStore;
    routerStore: RouterStore;
  }
}
