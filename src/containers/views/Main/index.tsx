import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import styled from '@/styles';

import { InitLoading } from '@/components/common';
import { withRouterProps } from '@/components/utils/withComponents';
import { menu, loadableComponents, loadableToolbarComponents } from './menu';

import Sidber from './Sider';
import Header from './Header';

interface IMainProps extends IClassName, IWithRouterProps {
  updateRouter: RouterStore.IUpdateCurrentRouter;
  userInfo: UserStore.IUserInfo;
  isInitLoading: boolean;
}

@withRouterProps
@inject((store: IStore) => {
  const { updateRouter } = store.routerStore;
  const { isInitLoading } = store.globalStore;
  const { userInfo } = store.userStore;
  return { updateRouter, userInfo, isInitLoading };
})
@observer
class Main extends React.Component<IMainProps> {
  public getSnapshotBeforeUpdate() {
    this.props.updateRouter(this.props.location!);
    return true;
  }

  public componentDidMount() {
    this.props.updateRouter(this.props.location!);
  }

  public render() {
    const { className, userInfo, isInitLoading } = this.props;
    return isInitLoading ? (
      <InitLoading />
    ) : (
      <Layout className={className}>
        <Sidber />
        <Layout className="layout__right">
          <Header avatar={userInfo.avatar}>
            <Switch>
              {menu.map(i => {
                if (i.toolbarComponent) {
                  return (
                    <Route key={i.key} exact={i.exact} path={i.path} component={loadableToolbarComponents[i.toolbarComponent]} />
                  );
                } else {
                  return null;
                }
              })}
            </Switch>
          </Header>
          <Layout.Content className="layout__content">
            <Switch>
              {menu.map(i => {
                if (i.path) {
                  return <Route key={i.key} exact={i.exact} path={i.path} component={loadableComponents[i.component!]} />;
                } else {
                  return null;
                }
              })}
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default styled(Main)`
  height: 100vh;
  .layout__content {
    padding: 24px;
    height: 100%;
    overflow: hidden;
    background-color: #f0f2f5;
  }
`;
