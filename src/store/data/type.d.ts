import { DataStore as dataStore } from './index';

export as namespace DataStore;

export interface IDataStore extends dataStore {}

export interface IClassNames {
  key?: string;
  _id: string;
  className: string;
}

export interface ISortClassification {
  (value: IClassNames[]): void;
}

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
