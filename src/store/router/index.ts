import { observable, action, when } from 'mobx';
import articleStore, { ArticleStore } from '../article';
import userStore, { UserStore } from '../user';
import messageStore, { MessageStore } from '../message';
import frontStore, { FrontStore } from '../front';

export class RouterStore {
  @observable
  currentRouter: RouterStore.ICurrentRouter | null = null;

  articleStore: ArticleStore;
  userStore: UserStore;
  messageStore: MessageStore;
  frontStore: FrontStore;
  constructor(aStore: ArticleStore, uStore: UserStore, mStore: MessageStore, fStore: FrontStore) {
    this.articleStore = aStore;
    this.userStore = uStore;
    this.messageStore = mStore;
    this.frontStore = fStore;

    when(
      () => (this.currentRouter ? true : false),
      () => {
        this.articleStore.init();
        this.userStore.init();
        this.messageStore.init();
        this.frontStore.init();
      }
    );
  }

  // 记录路由
  @action
  updateRouter: RouterStore.IUpdateCurrentRouter = router => {
    this.currentRouter = router;
  };
}

export default new RouterStore(articleStore, userStore, messageStore, frontStore);
