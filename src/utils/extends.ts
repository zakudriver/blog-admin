import * as React from 'react';
import { message } from 'antd';
import userApi from '@/api/user.api';

export class ComponentExtends<T = {}, S = {}, SS = any> extends React.Component<T, S, SS> {
  readonly $message = message;
  readonly userApi$$ = userApi;
}
