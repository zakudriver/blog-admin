import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@/styles';

import LoginDrawer from '@/containers/shared/Login/Drawer';
import LoginMain from '@/containers/shared/Login/Main';

interface ILoginProps extends IClassName {
  config: GlobalStore.IConfig;
  onLogin: UserStore.IOnLogin;
}

interface ILoginState {
  clientWidth: number;
  isDrawer: boolean;
}

@inject(
  (store: IStore): ILoginProps => {
    const { config } = store.globalStore;
    const { onLogin } = store.userStore;
    return { config, onLogin };
  }
)
@observer
class Login extends React.Component<ILoginProps, ILoginState> {
  public state = {
    clientWidth: 0,
    isDrawer: false
  };

  public resize = () => {
    this.setState({
      clientWidth: document.body.clientWidth
    });
  };

  public onDrawer = () => {
    this.setState({
      isDrawer: !this.state.isDrawer
    });
  };
  public closeDrawer = () => {
    if (this.state.isDrawer) {
      this.setState({
        isDrawer: false
      });
    }
  };

  public componentDidMount() {
    this.setState({
      clientWidth: document.body.clientWidth
    });
    window.addEventListener('resize', this.resize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  public render() {
    const { className, config, onLogin } = this.props;
    return (
      <div className={className}>
        <LoginDrawer isDrawer={this.state.isDrawer} config={config} login={onLogin} />
        <LoginMain config={config} onDrawer={this.onDrawer} closeDrawer={this.closeDrawer} {...this.state} />
      </div>
    );
  }
}

export default styled(Login)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;
