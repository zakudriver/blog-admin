import { Location } from 'history';
import { RouterStore as routerStore } from './index';

export as namespace RouterStore;

export interface IRouterStore extends routerStore {}

export interface ICurrentRouter extends Location {
  // loction: Location;
  // history: History;
  // match: any;
}

export interface IUpdateCurrentRouter {
  (router: ICurrentRouter): void;
}
