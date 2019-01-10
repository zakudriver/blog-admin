import * as React from 'react';
import { Spin, Icon } from 'antd';
import styled from '@/styles';

const antIcon = <Icon type="loading-3-quarters" spin />;

const SpinWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

const InitSpinWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #e1e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const InitLoading = () => (
  <InitSpinWrap>
    <Spin indicator={antIcon} tip="Loading..." size="large" style={{ color: 'red' }} />
  </InitSpinWrap>
);
