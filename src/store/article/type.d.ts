import { ArticleStore as articleStore } from './index';
import { IResponse } from '@/service';
import { UploadFile } from 'antd/lib/upload/interface';

export as namespace ArticleStore;

export interface IArticleStore extends articleStore {}

// Category
export interface ICategory {
  key?: string;
  _id: string;
  order: number;
  name: string;
}

export interface IAddCategory {
  (value: { name: string }): Promise<IResponse>;
}

export interface ISortCategory {
  (value: ICategory[]): void;
}

export interface IUpdateCategory {
  (value?: ICategory): void;
}

export interface IRemoveCategory {
  (value: ICategory): void;
}

// Article
export type UploadedFile = { uid: string; name: string; url: string; key: number; _id: string };
export interface IArticle {
  key?: string;
  _id?: string;
  title: string;
  className: string;
  content: string;
  isFormal: boolean;
  uploads: Array<UploadFile | UploadedFile | string>;
  isEdit?: boolean;
  updateTime: string;
  createTime: string;
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

export interface IRemoveUploadFile {
  (_id: string): Promise<boolean>;
}
