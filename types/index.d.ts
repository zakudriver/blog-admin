import { History, Location } from 'history';
import * as Prism from 'prismjs';

declare global {
  const APP_ENV: string;

  interface Window {
    less: LessStatic;
    Prism: typeof Prism;
  }

  interface IClassName {
    className?: string;
  }

  interface IWithRouterProps {
    location?: Location<any>;
    history?: History;
    match?: match;
  }

  interface IStore {
    userStore: UserStore.IUserStore;
    globalStore: GlobalStore.IGlobalStore;
    articleStore: ArticleStore.IArticleStore;
    messageStore: MessageStore.IMessageStore;
    routerStore: RouterStore.IRouterStore;
    frontStore: FrontStore.IFrontStore;
  }
}

interface match {
  params: any;
  isExact: boolean;
  path: string;
  url: string;
}
