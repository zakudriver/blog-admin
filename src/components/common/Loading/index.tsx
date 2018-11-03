import * as React from 'react';
import { Spin, Icon } from 'antd';
import styled from '@/styles';

const antIcon = <Icon type="loading-3-quarters" spin />;

const SpinWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

export const Loading = () => (
  <SpinWrap>
    <Spin size="large" />
  </SpinWrap>
);

export const AppLoading = () => (
  <SpinWrap>
    <Spin indicator={antIcon} tip="Loading..." />
  </SpinWrap>
);
