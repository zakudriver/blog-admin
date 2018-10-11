import { ArticleStore as articleStore } from './index';
import { IResponse } from '@/api';

export as namespace ArticleStore;

export interface IArticleStore extends articleStore {}

// Classification
export interface IClassNames {
  key?: string;
  _id: string;
  order: number;
  name: string;
}

export interface IAddClassification {
  (value: { name: string }): Promise<IResponse>;
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

// Article
export interface IArticle {
  key?: string;
  _id?: string;
  title: string;
  className: string;
  content: string;
  isFormal: boolean;
  time: string;
  isEdit?: boolean;
  // updateTime: string;
  // createTime: string;
}

type Indexes<T> = { [P in keyof T]?: T[P] };
export interface IChangeArticle {
  (value: Indexes<IArticle>): void;
}

// ArticleList
export interface IArticleList {
  count: number;
  rows: IArticle[];
}

export interface IGetArticle {
  (_id: string): void;
}

export interface IGetArticleList {
  (index?: number, limit?: number, condition?: number, className?: string): void;
}

export interface IChangeFilterCondition {
  (condition: number): void;
}

export interface IChangeClassNameCondition {
  (className: string): void;
}