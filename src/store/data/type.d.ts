import { DataStore as dataStore } from './index';
import { IResponse } from '@/api';

export as namespace DataStore;

export interface IDataStore extends dataStore {}

export interface IClassNames {
  key?: string;
  _id: string;
  order: number;
  className: string;
}

export interface IAddClassification {
  (value: { [i: string]: string }): Promise<IResponse>;
}

export interface ISortClassification {
  (value: IClassNames[]): void;
}

export interface IUpdateClassification {
  (value?: IClassNames): void;
}

export interface IRemoveClassification {
  (value: IClassNames): void;
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
