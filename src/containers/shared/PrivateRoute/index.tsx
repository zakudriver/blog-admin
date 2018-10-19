import * as React from 'react';
import { Route } from 'react-router-dom';
import { ComponentExtends } from '@/utils/extends';
import { withRouterProps } from '@/components/utils/withComponents';
import { TokenField } from '@/constants';

interface IPrivateRouteProps extends IClassName, IWithRouterProps {
  component: any;
  path: string;
}

@withRouterProps
export default class PrivateRoute extends ComponentExtends<IPrivateRouteProps> {
  public backLogin = () => {
    this.$message.error('logon failure');
    this.props.history!.push('/login');
  };

  public async componentDidMount() {
    const token = localStorage.getItem(TokenField);

    if (token) {
      const res = await this.userApi$$.auth();
      if (res.code !== 0) {
        this.backLogin();
      }
    } else {
      this.backLogin();
    }
  }

  public render() {
    const { component: Component, ...rest } = this.props;
    return <Route {...rest} render={props => <Component />} />;
  }
}
