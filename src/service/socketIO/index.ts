import * as socketio from 'socket.io-client';
import tokenStore from '@/store/user/token';

const socketUrl = 'http://localhost:9999';

type Event = 'Message' | 'SubscribeMessage';

export class SocketIO {
  private _socketUrl = socketUrl;
  private _socket: SocketIOClient.Socket;
  constructor() {
    this._socket = socketio(this._socketUrl);
  }

  emit(event: Event, params?: any) {
    const arg = {
      token: tokenStore.token,
      params
    };
    this._socket.emit(event, arg);
  }

  on(event: Event, func: (data: any) => void) {
    this._socket.on(event, (d: any) => {
      func(d);
    });
  }
}

export const io = new SocketIO();
