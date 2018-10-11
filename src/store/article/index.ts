import { observable, action, reaction } from 'mobx';
import { StoreExtends } from '@/utils/extends';
import { ArticlePage } from '@/constants';

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
    this.init();

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

  init() {
    this.getClassification();
  }

  // Classification
  @action
  getClassification = async () => {
    const res = await this.classificationApi$$.getClassification();
    if (res.code === 0) {
      this.classification = res.data;
      this.article.className = res.data[0]._id;
    }
  };

  @action
  addClassification: ArticleStore.IAddClassification = async req => {
    const res = await this.classificationApi$$.addClassification(req);
    if (res.code === 0) {
      this.$message.success(res.msg);
      this.classification = res.data;
    } else {
      this.$message.error(res.msg);
    }
    return Promise.resolve(res);
  };

  @action
  sortClassification: ArticleStore.ISortClassification = value => {
    value.forEach((i, idx) => {
      i.order = idx;
    });
    this.classification = value;
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
    if (res.code === 0) {
      this.$message.success(res.msg);
      this.classification = res.data;
    } else {
      this.$message.error(res.msg);
    }
  };

  @action
  removeClassification: ArticleStore.IRemoveClassification = async value => {
    const res = await this.classificationApi$$.removeClassification({ _id: value._id });
    if (res.code === 0) {
      this.$message.success(res.msg);
      this.classification = res.data;
    } else {
      this.$message.error(res.msg);
    }
  };

  // Article
  @action
  changeArticle: ArticleStore.IChangeArticle = value => {
    Object.keys(value).forEach(i => {
      this.article[i] = value[i];
    });
  };

  @action
  saveArticle = async () => {
    const saveArticle = Object.assign(this.article, { isFormal: false });
    let res;
    if (saveArticle.isEdit) {
      res = await this.articleApi$$.updateArticle(saveArticle);
    } else {
      res = await this.articleApi$$.addArticle(saveArticle);
    }
    console.log(res);
    if (res.code === 0) {
      this.$message.success(res.msg);
      this.restore();
    } else {
      this.$message.error(res.msg);
    }
  };

  @action
  publishArticle = async () => {
    const publishArticle = Object.assign(this.article, { isFormal: true });
    let res;
    if (publishArticle.isEdit) {
      res = await this.articleApi$$.updateArticle(publishArticle);
    } else {
      res = await this.articleApi$$.addArticle(publishArticle);
    }
    console.log(res);
    if (res.code === 0) {
      this.$message.success(res.msg);
      this.restore();
    } else {
      this.$message.error(res.msg);
    }
  };

  @action
  getArticle: ArticleStore.IGetArticle = async _id => {
    this.isArticleLoading = true;
    const res = await this.articleApi$$.getArticle({ _id });
    this.isArticleLoading = false;
    if (res.code === 0) {
      // this.article = res.data;
      this.article = Object.assign(res.data, { isEdit: true });
    }
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
    this.isArticleListLoading = false;
    if (res.code === 0) {
      this.articleList = res.data;
    }
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
  restore = () => {
    this.article = {
      title: '// title',
      content: '// . . . content',
      className: this.classification[0]._id,
      isFormal: false,
      // time: moment().format(),
      createTime: '',
      updateTime: ''
    };
  };
}

export default new ArticleStore();
