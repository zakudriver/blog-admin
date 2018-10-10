import { observable, action } from 'mobx';
import { StoreExtends } from '@/utils/extends';
import * as moment from 'moment';

export class DataStore extends StoreExtends {
  @observable
  classification: DataStore.IClassNames[] = [];

  @observable
  article: DataStore.IArticle = {
    title: '// title',
    content: '// . . . content',
    className: '',
    isFormal: false,
    time: moment().format()
  };

  @observable
  articleList: DataStore.IArticleList = { count: 0, rows: [] };

  @observable
  isArticleListLoading: boolean = false;

  @observable
  isArticleLoading: boolean = false;

  @observable
  message: DataStore.IMessageList = { count: 0, rows: [] };

  @observable
  isMessageLoading: boolean = false;

  constructor() {
    super();
    this.init();
  }

  init() {
    this.getClassification();
  }

  @action
  getClassification = async () => {
    const res = await this.classificationApi$$.getClassification();
    if (res.code === 0) {
      this.classification = res.data;
    }
  };

  @action
  addClassification: DataStore.IAddClassification = async req => {
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
  sortClassification: DataStore.ISortClassification = value => {
    value.forEach((i, idx) => {
      i.order = idx;
    });
    this.classification = value;
  };

  @action
  updateClassification: DataStore.IUpdateClassification = async value => {
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
  removeClassification: DataStore.IRemoveClassification = async value => {
    const res = await this.classificationApi$$.removeClassification({ _id: value._id });
    if (res.code === 0) {
      this.$message.success(res.msg);
      this.classification = res.data;
    } else {
      this.$message.error(res.msg);
    }
  };

  @action
  changeArticle: DataStore.IChangeArticle = value => {
    Object.keys(value).forEach(i => {
      this.article[i] = value[i];
    });
  };

  @action
  saveArticle = async () => {
    const saveArticle = { ...this.article, isFormal: false };
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
    const publishArticle = { ...this.article, isFormal: true };
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
  getArticle: DataStore.IGetArticle = async _id => {
    this.isArticleLoading = true;
    const res = await this.articleApi$$.getArticle({ _id });
    this.isArticleLoading = false;
    if (res.code === 0) {
      this.article = res.data;
      this.article = Object.assign(res.data, { isEdit: true });
    }
  };

  @action
  getArticleList: DataStore.IGetArticleList = async (index = 1, limit = 10) => {
    this.isArticleListLoading = true;
    const res = await this.articleApi$$.getArticleList({ index, limit });
    this.isArticleListLoading = false;
    if (res.code === 0) {
      this.articleList = res.data;
    }
  };

  @action
  getMessage: DataStore.IGetMessage = async (index = 1, limit = 10) => {
    this.isMessageLoading = true;
    const res = await this.messageApi$$.getMessage({ index, limit });
    this.isMessageLoading = false;
    if (res.code === 0) {
      this.message = res.data;
    }
  };

  @action
  restore = () => {
    this.article = {
      title: '// title',
      content: '// . . . content',
      className: '',
      isFormal: false,
      time: moment().format()
    };
  };
}

export default new DataStore();
