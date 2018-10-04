import { observable, action } from 'mobx';
import { ApiExtends } from '@/utils/extends';

export class DataStore extends ApiExtends {
  @observable
  classification: DataStore.IClassNames[] = [];

  @observable
  message: DataStore.IMessageResponse = { count: 0, rows: [] };

  @observable
  isMessageLoading: boolean = false;

  @action
  getClassification = async () => {
    const res = await this.classificationApi$$.getClassification();
    if (res.code === 0) {
      this.classification = res.data;
    }
  };

  @action
  sortClassification: DataStore.ISortClassification = value => {
    this.classification = value;
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
}

export default new DataStore();
