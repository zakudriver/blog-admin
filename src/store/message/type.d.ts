import { MessageStore as messageStore } from './index';
import { IArticle } from '../article/type';

export as namespace MessageStore;

export interface IMessageStore extends messageStore {}

// Message
export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  time: string;
  text: string;
  article: IArticle;
}
