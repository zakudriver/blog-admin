import { observable, action } from 'mobx';

export class RouterStore {
  @observable
  currentRouter: RouterStore.ICurrentRouter | null = null;
  // { pathname: '', search: '', state: '', hash: '' };

  // 记录路由
  @action
  updateRouter: RouterStore.IUpdateCurrentRouter = router => {
    console.log(router);
    this.currentRouter = router;
  };
}

export default new RouterStore();
