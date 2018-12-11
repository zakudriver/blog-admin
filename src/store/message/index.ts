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
    io.emit('Message');
    io.on('Message', d => {
      console.log(d);
    });
  }
}

export default new MessageStore();
