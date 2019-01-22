import { observable, runInAction } from 'mobx';
import { StoreExtends } from '@/utils/extends';
import { io } from '@/service/socket';
import { Event } from '@/constants/enum';

export class MessageStore extends StoreExtends {
  @observable
  message: MessageStore.IMessage[] = [];

  constructor() {
    super();
  }

  init() {
    io.emit(Event.SubscribeMessage);
    io.on(Event.Message, res => {
      console.log(res);
      runInAction(() => {
        if (res.code === 0) {
          if (Array.isArray(res.data)) {
            this.message = res.data;
          } else {
            this.message = [];
          }
        }
      });
    });
  }

  onAlready = () => {
    if (this.message.length) {
      io.emit(Event.AlreadyMessage);
    }
  };
}

export default new MessageStore();
