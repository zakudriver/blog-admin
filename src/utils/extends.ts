import * as React from 'react';
import { message } from 'antd';
import userApi from '@/api/user.api';
import messageApi from '@/api/message.api';
import classificationApi from '@/api/classification.api';
import articleApi from '@/api/article.api';
import uploadApi from '@/api/upload.api';
import { applyMixins } from '@/utils';

export class ApiExtends {
  readonly userApi$$ = userApi;
  readonly messageApi$$ = messageApi;
  readonly classificationApi$$ = classificationApi;
  readonly articleApi$$ = articleApi;
  readonly uploadApi$$ = uploadApi;
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
}

applyMixins(ComponentExtends, [ApiExtends]);
