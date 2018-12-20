import { observable, action, when } from 'mobx';
import articleStore, { ArticleStore } from '../article';
import userStore, { UserStore } from '../user';
import messageStore, { MessageStore } from '../message';

export class RouterStore {
  @observable
  currentRouter: RouterStore.ICurrentRouter | null = null;

  articleStore: ArticleStore;
  userStore: UserStore;
  messageStore: MessageStore;
  constructor(aStore: ArticleStore, uStore: UserStore, mStore: MessageStore) {
    this.articleStore = aStore;
    this.userStore = uStore;
    this.messageStore = mStore;

    when(
      () => (this.currentRouter ? true : false),
      () => {
        console.log('when');
        this.articleStore.init();
        this.userStore.init();
        this.messageStore.init();
      }
    );
  }

  // 记录路由
  @action
  updateRouter: RouterStore.IUpdateCurrentRouter = router => {
    this.currentRouter = router;
  };
}

export default new RouterStore(articleStore, userStore, messageStore);
