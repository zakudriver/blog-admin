import * as React from 'react';
import styled from '@/styles';

interface IActionGroupProps extends IClassName {
  direction: string;
  pixel?: string | number;
  border?: string;
  children: React.ReactNode;
}

const ActionGroup = styled<IActionGroupProps, 'div'>('div')`
  position: relative;
  & > span {
    display: inline-block;
    margin: ${props => (props.direction === 'right' ? `0 ${props.pixel || 10}px 0 0` : `0 0 0 ${props.pixel || 10}px`)};
  }
`;

const ActionItem = styled('span')``;

interface IActionLineProps {
  border: string;
  height: number | string;
  width?: number | string;
}

const ActionLine = styled<IActionLineProps, 'i'>('i')`
  display: inline-block;
  width: ${props => `${props.width || 20}px`};
  &::before {
    content: '';
    position: absolute;
    height: ${props => `${props.height}px`};
    left: 0;
    top: ${props => `${countTop(props.height)}px`};
    border-left: ${props => props.border};
  }
`;

export default { ActionGroup, ActionItem, ActionLine };

function countTop(h: string | number, height = 64) {
  h = typeof h === 'string' ? parseInt(h, 10) : h;
  return (height - h) / 2;
}
