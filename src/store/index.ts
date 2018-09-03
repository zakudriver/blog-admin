import userStore from './user';
import globalStore from './global';
import { RouterStore } from 'mobx-react-router';

const routerStore = new RouterStore();

export { userStore, globalStore, routerStore };
