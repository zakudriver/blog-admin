import * as React from 'react';
import { Layout } from 'antd';
import styled from '@/styles';

import Sidber from './Sider';
import Header from './Header';

interface IHomeProps extends IClassName {}

const Main = (props: IHomeProps) => (
  <Layout className={props.className}>
    <Sidber />
    <Layout>
      <Header />
      <Layout.Content>Content</Layout.Content>
    </Layout>
  </Layout>
);

export default styled(Main)`
  height: 100%;
`;
