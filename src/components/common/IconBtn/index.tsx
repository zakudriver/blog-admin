import * as React from 'react';
import { Icon } from 'antd';
import styled from '@/styles';

interface IIconBtnProps extends IClassName {
  size?: number | string;
  color?: string;
  hoverColor?: string | boolean;
  type: string;
  iconTheme?: 'filled' | 'outlined' | 'twoTone';
  onClick?: () => void;
}

const IconBtn = ({ type, iconTheme, onClick, className }: IIconBtnProps) => (
  <Icon className={className} type={type} theme={iconTheme} onClick={onClick} />
);

export default styled(IconBtn)`
  font-size: ${props => `${props.size}px`};
  color: ${props => `${props.color || props.theme.primaryColor}`};
  cursor: pointer;
  &:hover {
    color: ${props => `${props.hoverColor || props.theme.primaryColor}`};
  }
`;
