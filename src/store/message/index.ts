import { observable, action } from 'mobx';
import { StoreExtends } from '@/utils/extends';
import { MessagePage } from '@/constants/enum';

export class MessageStore extends StoreExtends {
  @observable
  message: MessageStore.IMessageList = { count: 0, rows: [] };

  @observable
  isMessageLoading: boolean = false;

  @action
  getMessage: MessageStore.IGetMessage = async (index = MessagePage.Index, limit = MessagePage.Limit) => {
    this.isMessageLoading = true;
    const res = await this.messageApi$$.getMessage({ index, limit });
    this.isMessageLoading = false;
    if (res.code === 0) {
      this.message = res.data;
    }
  };
}

export default new MessageStore();
