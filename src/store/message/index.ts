import { observable } from 'mobx';
import { StoreExtends } from '@/utils/extends';
import { io } from '@/service/socketio';

export class MessageStore extends StoreExtends {
  @observable
  message: MessageStore.IMessage[] = [];

  constructor() {
    super();
    this.init();
  }

  init() {
    io.emit('SubscribeMessage');
    io.on('Message', (d: any) => {
      console.log(d);
    });
  }
}

export default new MessageStore();
