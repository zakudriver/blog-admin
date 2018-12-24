// article 分页
export enum ArticlePage {
  Index = 1,
  Limit = 10
}

// 权限
export enum Permission {
  root = 0,
  admin = 1,
  guest = 2
}

export enum Event {
  Message = 'Message',
  SubscribeMessage = 'SubscribeMessage',
  AlreadyMessage = 'AlreadyMessage'
}
