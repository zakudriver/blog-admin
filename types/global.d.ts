import * as React from 'react';
import { UploadFile } from 'antd/lib/upload/interface';
import { History, Location } from 'history';

declare global {
  const APP_ENV: string;

  interface IRouterProps {
    location?: Location<any>;
    history?: History;
    match?: any;
  }

  interface IStore {
    userStore: UserStore.IUserStore;
    globalStore: GlobalStore.IGlobalStore;
    articleStore: ArticleStore.IArticleStore;
    messageStore: MessageStore.IMessageStore;
    routerStore: RouterStore.IRouterStore;
  }
}

// declare class Uploading extends React.Component<{ onRemove?: (file: UploadFile) => void | boolean | Promise<any> }> {}

// declare interface UploadProps {
//   onRemove?: (file: UploadFile) => void | boolean | Promise<any>;
// }
