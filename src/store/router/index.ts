import { observable, action, when } from 'mobx';
import articleStore, { ArticleStore } from '../article';
import userStore, { UserStore } from '../user';

export class RouterStore {
  @observable
  currentRouter: RouterStore.ICurrentRouter | null = null;

  articleStore: ArticleStore;
  userStore: UserStore;
  constructor(aStore: ArticleStore, uStore: UserStore) {
    this.articleStore = aStore;
    this.userStore = uStore;

    when(
      () => (this.currentRouter ? true : false),
      () => {
        console.log('when');
        this.articleStore.init();
        this.userStore.init();
      }
    );
  }

  // 记录路由
  @action
  updateRouter: RouterStore.IUpdateCurrentRouter = router => {
    this.currentRouter = router;
  };
}

export default new RouterStore(articleStore, userStore);
