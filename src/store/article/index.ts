import { observable, action, reaction, runInAction } from 'mobx';
import immer from 'immer';
import { IResponse } from '@/service';
import { StoreExtends } from '@/utils/extends';
import { ArticlePage } from '@/constants/enum';
import { UploadFile } from 'antd/lib/upload/interface';

export class ArticleStore extends StoreExtends {
  // classification
  @observable
  classification: ArticleStore.IClassNames[] = [];

  // article
  @observable
  article: ArticleStore.IArticle = {
    title: '// title',
    content: '// . . . content',
    className: '',
    isFormal: false,
    uploads: [],
    updateTime: '',
    createTime: ''
  };

  @observable
  articleList: ArticleStore.IArticleList = { count: 0, rows: [] };

  @observable
  isArticleListLoading: boolean = false;

  @observable
  isArticleLoading: boolean = false;

  @observable
  filterCondition: number = 0;

  @observable
  classNameCondition: string = '';

  constructor() {
    super();

    reaction(
      () => this.filterCondition,
      condition => {
        this.getArticleList(ArticlePage.Index, ArticlePage.Limit, condition, this.classNameCondition);
      }
    );

    reaction(
      () => this.classNameCondition,
      className => {
        this.getArticleList(ArticlePage.Index, ArticlePage.Limit, this.filterCondition, className);
      }
    );
  }

  @action
  init = () => {
    this.getClassification();
  };

  // Classification
  @action
  getClassification = async () => {
    const res = await this.classificationApi$$.getClassification();
    runInAction(() => {
      if (res.code === 0) {
        this.classification = res.data;
        this.article.className = res.data[0]._id;
      }
    });
  };

  @action
  addClassification: ArticleStore.IAddClassification = async req => {
    const res = await this.classificationApi$$.addClassification(req);
    return runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.classification = res.data;
      }
      return Promise.resolve(res);
    });
  };

  @action
  sortClassification: ArticleStore.ISortClassification = value => {
    // value.forEach((i, idx) => {
    //   i.order = idx;
    // });

    this.classification = value.map((i, idx) => {
      i.order = idx;
      return i;
    });
  };

  @action
  updateClassification: ArticleStore.IUpdateClassification = async value => {
    let req;
    if (value) {
      req = value;
    } else {
      req = this.classification.map(i => {
        return { _id: i._id, order: i.order };
      });
    }
    const res = await this.classificationApi$$.updateClassification(req);
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.classification = res.data;
      }
    });
  };

  @action
  removeClassification: ArticleStore.IRemoveClassification = async value => {
    const res = await this.classificationApi$$.removeClassification({ _id: value._id });
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.classification = res.data;
      }
    });
  };

  // Article
  @action
  changeArticle: ArticleStore.IChangeArticle = value => {
    console.log('changeArticle');
    console.log(value);
    Object.keys(value).forEach(i => {
      this.article[i] = value[i];
    });
  };

  @action
  saveArticle = async () => {
    const saveArticle = handleArticleSource(this.article, false);
    let res: IResponse;
    if (saveArticle.isEdit) {
      res = await this.articleApi$$.updateArticle(saveArticle);
    } else {
      res = await this.articleApi$$.addArticle(saveArticle);
    }
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.restore();
      }
    });
  };

  @action
  publishArticle = async () => {
    const publishArticle = handleArticleSource(this.article, true);
    let res: IResponse;
    if (publishArticle.isEdit) {
      res = await this.articleApi$$.updateArticle(publishArticle);
    } else {
      res = await this.articleApi$$.addArticle(publishArticle);
    }
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.restore();
      }
    });
  };

  @action
  getArticle: ArticleStore.IGetArticle = async _id => {
    this.isArticleLoading = true;
    const res = await this.articleApi$$.getArticle({ _id });
    runInAction(() => {
      this.isArticleLoading = false;
      if (res.code === 0) {
        // this.article = Object.assign(res.data, { isEdit: true });
        res.data.isEdit = true;
        res.data.uploads = res.data.uploads.map((i: any, idx: number) => {
          i.uid = i._id;
          i.key = idx;
          return i;
        });
        this.article = res.data;
      }
    });
  };

  @action
  getArticleList: ArticleStore.IGetArticleList = async (
    index = ArticlePage.Index,
    limit = ArticlePage.Limit,
    condition,
    className
  ) => {
    this.isArticleListLoading = true;
    const res = await this.articleApi$$.getArticleList({ index, limit, condition, className });
    runInAction(() => {
      this.isArticleListLoading = false;
      if (res.code === 0) {
        res.data.rows.forEach((i: any, idx: number) => {
          i.key = idx;
        });
        this.articleList = res.data;
      }
    });
  };

  @action
  changeFilterCondition: ArticleStore.IChangeFilterCondition = condition => {
    this.filterCondition = condition;
  };

  @action
  changeClassNameCondition: ArticleStore.IChangeClassNameCondition = className => {
    this.classNameCondition = className;
  };

  @action
  removeUploadFile: ArticleStore.IRemoveUploadFile = async _id => {
    const res = await this.uploadApi$$.removeFile({ _id });
    return runInAction(() => {
      if (res.code === 0) {
        return true;
      } else {
        return false;
      }
    });
  };

  @action
  restore = () => {
    this.article = {
      title: '// title',
      content: '// . . . content',
      className: this.classification[0] ? this.classification[0]._id : '',
      isFormal: false,
      uploads: [],
      createTime: '',
      updateTime: ''
    };
  };
}

export default new ArticleStore();

/**
 *  处理文章数据
 *
 * @param {ArticleStore.IArticle} article
 * @param {boolean} isFormal
 * @returns
 */
function uploadsmap(params: UploadFile | ArticleStore.UploadedFile): string;
function uploadsmap(params: any): string {
  if (params.response) {
    return params.response.data._id;
  } else {
    return params._id;
  }
}
function handleArticleSource(article: ArticleStore.IArticle, isFormal: boolean) {
  return immer(article, draft => {
    draft.isFormal = isFormal;
    draft.uploads = draft.uploads.map((i: any) => uploadsmap(i));
  });
}

// function uploadsmap(params: UploadFile): string;
