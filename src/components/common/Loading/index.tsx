import * as React from 'react'
import { Spin } from 'antd'
import styled from '@/styles'

const Loading = () => (
  <SpinWrap>
    <Spin />
  </SpinWrap>
)

const SpinWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`

export default Loading
