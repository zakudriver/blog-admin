import * as React from 'react';
import { message } from 'antd';
import userApi from '@/api/user.api';
import messageApi from '@/api/message.api';
import classificationApi from '@/api/classification.api';
import { applyMixins } from '@/utils';

export class ApiExtends {
  readonly userApi$$ = userApi;
  readonly messageApi$$ = messageApi;
  readonly classificationApi$$ = classificationApi;
}

// export class ComponentExtends<T = {}, S = {}, SS = any> extends React.Component<T, S, SS> {
//   readonly $message = message;
//   readonly userApi$$ = userApi;
//   readonly messageApi$$ = messageApi;
// }

export class ComponentExtends<T = {}, S = {}, SS = any> extends React.Component<T, S, SS> implements ApiExtends, React.Component<T, S, SS> {
  readonly $message = message;
  readonly userApi$$ = userApi;
  readonly messageApi$$ = messageApi;
  readonly classificationApi$$ = classificationApi;
}

applyMixins(ComponentExtends, [ApiExtends]);
