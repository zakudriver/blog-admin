import { observable, action } from 'mobx';
import messageApi from '@/api/message.api';

export class DataStore {
  @observable
  message: DataStore.IMessage[] = [];

  @action
  getMessage: DataStore.IGetMessage = async (params = { index: 1, limit: 10 }) => {
    const result = await messageApi.getMessage(params);
    console.log(result);
  };
}

export default new DataStore();
