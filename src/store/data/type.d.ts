import { DataStore as dataStore } from './index';

export as namespace DataStore;

export interface IDataStore extends dataStore {}

export interface IMessage {
  email: string;
  time: string;
  text: string;
}

export interface IGetMessage {
  (params?: { index: number; limit: number }): void;
}
