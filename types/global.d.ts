
// export { default as Carousel } from './carousel';

import { History, Location } from 'history';

declare global {
  const APP_ENV: string;

  interface IRouterProps {
    location?: Location;
    history?: History;
    match?: any;
  }

  interface IStore {
    userStore: UserStore.IUserStore;
    globalStore: GlobalStore.IGlobalStore;
    dataStore: DataStore.IDataStore;
    // routerStore: RouterStore;
  }
}
