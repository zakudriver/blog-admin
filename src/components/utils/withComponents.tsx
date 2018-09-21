import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export function withRouterProps<T = {}, S = {}>(Component: React.ComponentClass<T, S> | React.SFC<T>) {
  class C extends React.Component<T extends RouteComponentProps<any> ? T : any> {
    public render(): JSX.Element {
      return <Component {...this.props} />;
    }
  }
  return withRouter(C);
}
