import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import styled from '@/styles';

import { menu, loadableComponents } from './menu';

import Sidber from './Sider';
import Header from './Header';

interface IMainProps extends IClassName {}

const Main = (props: IMainProps) => (
  <Layout className={props.className}>
    <Sidber />
    <Layout>
      <Header />
      <Layout.Content>
        <Router>
          <Switch>
            {menu.map(i => {
              if (i.path) {
                return <Route key={i.key} exact={i.exact} path={i.path} component={loadableComponents[i.component!]} />;
              } else {
                return null;
              }
            })}
          </Switch>
        </Router>
      </Layout.Content>
    </Layout>
  </Layout>
);

export default styled(withRouter(Main))`
  height: 100%;
`;
