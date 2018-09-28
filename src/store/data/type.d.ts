import { DataStore as dataStore } from './index';

export as namespace DataStore;

export interface IDataStore extends dataStore {}

export interface IMessage {
  key?: string;
  _id: string;
  email: string;
  time: string;
  text: string;
}

export interface IMessageResponse {
  count: number;
  rows: IMessage[];
}

export interface IGetMessage {
  (index?: number, limit?: number): void;
}
