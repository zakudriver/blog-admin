import * as React from 'react';
import { inject ,observer} from 'mobx-react';
import styled from '@/styles';

import LoginDrawer from '@/containers/shared/Login/Drawer';
import LoginMain from '@/containers/shared/Login/Main';

interface ILoginProps extends IClassName {
  webConfig: GlobalStore.IWebConfig;
  changeToken: GlobalStore.IChangeToken;
}

interface ILoginState {
  clientWidth: number;
  isDrawer: boolean;
}

@inject(
  (store: IStore): ILoginProps => {
    const { webConfig, changeToken } = store.globalStore;
    return { webConfig, changeToken };
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
    return (
      <div className={this.props.className}>
        <LoginDrawer
          isDrawer={this.state.isDrawer}
          width={this.props.webConfig.drawerWidth}
          changeToken={this.props.changeToken}
        />
        <LoginMain webConfig={this.props.webConfig} onDrawer={this.onDrawer} closeDrawer={this.closeDrawer} {...this.state} />
      </div>
    );
  }
}

export default styled(Login)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;
