import { observable, action } from 'mobx';
import messageApi from '@/api/message.api';

export class DataStore {
  @observable
  message: DataStore.IMessageResponse = { count: 0, rows: [] };
  @observable
  isMessageLoading: boolean = false;

  @action
  getMessage: DataStore.IGetMessage = async (index = 1, limit = 10) => {
    this.isMessageLoading = true;
    const results = await messageApi.getMessage({ index, limit });
    this.isMessageLoading = false;
    if (results.code === 0) {
      this.message = results.data;
    }
  };
}

export default new DataStore();
