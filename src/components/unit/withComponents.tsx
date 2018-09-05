import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export function withRouterProps<T>(Component: React.ComponentClass<T> | React.SFC<T>) {
  class C extends React.Component<RouteComponentProps<any>> {
    public render(): JSX.Element {
      return <Component {...this.props} />;
    }
  }
  return withRouter(C);
}
