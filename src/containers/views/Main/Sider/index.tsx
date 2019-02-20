import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@/styles';
import { Layout, Icon } from 'antd';

import SiderMenu from '@/containers/views/Main/Sider/Menu';

interface ISiderProps extends IClassName {
  isCollapsed?: boolean;
  config?: GlobalStore.IConfig;
}

@inject(
  (store: IStore): ISiderProps => {
    const { isCollapsed } = store.globalStore;
    const { config } = store.globalStore;
    return {
      isCollapsed,
      config
    };
  }
)
@observer
class Sider extends React.Component<ISiderProps> {
  public render() {
    const { className, isCollapsed, config } = this.props;
    return (
      <Layout.Sider className={className} theme={'light'} collapsed={isCollapsed}>
        <Logo logo={config!.logo} />
        <SiderMenu />
      </Layout.Sider>
    );
  }
}

interface ILogo extends IClassName {
  logo: string;
}

const Logo = styled((props: ILogo) => (
  <div className={props.className}>{props.logo ? <img src={props.logo} alt="log" /> : <Icon type="ant-design" />}</div>
))`
  font-size: 50px;
  text-align: center;
  margin: 10px 0;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #f1f1f1;
  }
`;

export default styled(Sider)`
  background-color: #fff;
`;
