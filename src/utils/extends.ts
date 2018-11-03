import * as React from 'react';
import { message } from 'antd';
import userApi from '@/service/api/user.api';
import messageApi from '@/service/api/message.api';
import classificationApi from '@/service/api/classification.api';
import articleApi from '@/service/api/article.api';
import uploadApi from '@/service/api/upload.api';
import configApi from '@/service/api/config.api';
import { applyMixins } from '@/utils';

export class ApiExtends {
  readonly userApi$$ = userApi;
  readonly messageApi$$ = messageApi;
  readonly classificationApi$$ = classificationApi;
  readonly articleApi$$ = articleApi;
  readonly uploadApi$$ = uploadApi;
  readonly configApi$$ = configApi;
}

// export class ComponentExtends<T = {}, S = {}, SS = any> extends React.Component<T, S, SS> {
//   readonly $message = message;
//   readonly userApi$$ = userApi;
//   readonly messageApi$$ = messageApi;
// }
export class StoreExtends extends ApiExtends {
  readonly $message = message;
}

export class ComponentExtends<T = {}, S = {}, SS = any> extends React.Component<T, S, SS>
  implements ApiExtends, React.Component<T, S, SS> {
  readonly $message = message;
  readonly userApi$$ = userApi;
  readonly messageApi$$ = messageApi;
  readonly classificationApi$$ = classificationApi;
  readonly articleApi$$ = articleApi;
  readonly uploadApi$$ = uploadApi;
  readonly configApi$$ = configApi;
}

applyMixins(ComponentExtends, [ApiExtends]);
