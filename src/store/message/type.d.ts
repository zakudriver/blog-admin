import { MessageStore as messageStore } from './index';

export as namespace MessageStore;

export interface IMessageStore extends messageStore {}

// Message
export interface IMessage {
  key?: string;
  _id?: string;
  email: string;
  time: string;
  text: string;
}

export interface IMessageList {
  count: number;
  rows: IMessage[];
}

export interface IGetMessage {
  (index?: number, limit?: number): void;
}
