import { observable, action, reaction, runInAction } from 'mobx';
import immer from 'immer';
import { IResponse } from '@/service';
import { StoreExtends } from '@/utils/extends';
import { ArticlePage } from '@/constants/enum';
import { UploadFile } from 'antd/lib/upload/interface';

export class ArticleStore extends StoreExtends {
  // category
  @observable
  categories: ArticleStore.ICategories[] = [];

  // article
  @observable
  article: ArticleStore.IArticle = {
    title: '// title',
    content: '// . . . content',
    category: '',
    isFormal: false,
    uploads: [],
    cover: '',
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
  categoryCondition: string = '';

  constructor() {
    super();

    reaction(
      () => this.filterCondition,
      condition => {
        this.getArticleList(ArticlePage.Index, ArticlePage.Limit, condition, this.categoryCondition);
      }
    );

    reaction(
      () => this.categoryCondition,
      category => {
        this.getArticleList(ArticlePage.Index, ArticlePage.Limit, this.filterCondition, category);
      }
    );
  }

  init = () => {
    this.getCategory();
  };

  // Category
  @action
  getCategory = async () => {
    const res = await this.categoryApi$$.getCategory();
    runInAction(() => {
      if (res.code === 0) {
        this.categories = res.data;
        this.article.category = res.data[0]._id;
      }
    });
  };

  @action
  addCategory: ArticleStore.IAddCategory = async req => {
    const res = await this.categoryApi$$.addCategory(req);
    return runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.categories = res.data;
      }
      return Promise.resolve(res);
    });
  };

  @action
  sortCategory: ArticleStore.ISortCategory = value => {
    // value.forEach((i, idx) => {
    //   i.order = idx;
    // });

    this.categories = value.map((i, idx) => {
      i.order = idx;
      return i;
    });
  };

  @action
  updateCategory: ArticleStore.IUpdateCategory = async value => {
    let req;
    if (value) {
      req = value;
    } else {
      req = this.categories.map(i => {
        return { _id: i._id, order: i.order };
      });
    }
    const res = await this.categoryApi$$.updateCategory(req);
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.categories = res.data;
      }
    });
  };

  @action
  removeCategory: ArticleStore.IRemoveCategory = async value => {
    const res = await this.categoryApi$$.removeCategory({ _id: value._id });
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.categories = res.data;
      }
    });
  };

  // Article
  @action
  changeArticle: ArticleStore.IChangeArticle = value => {
    console.log('changeArticle');
    console.log(value);
    const key = Object.keys(value)[0];
    this.article[key] = value[key];
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
    category
  ) => {
    this.isArticleListLoading = true;
    const res = await this.articleApi$$.getArticleList({ index, limit, condition, category });
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
  changeClassNameCondition: ArticleStore.IChangeCategoryCondition = category => {
    this.categoryCondition = category;
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
      category: this.categories[0] ? this.categories[0]._id : '',
      isFormal: false,
      uploads: [],
      cover: '',
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
