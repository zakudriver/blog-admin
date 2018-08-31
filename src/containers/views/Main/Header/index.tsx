import * as React from 'react';
import styled from '@/styles';
import { observer, inject } from 'mobx-react';
import { Layout, Icon, Button, Avatar } from 'antd';

interface IHeaderProps extends IClassName {
  isCollapsed?: boolean;
  onCollapsed?: () => void;
}

const Header = ({ className, isCollapsed, onCollapsed }: IHeaderProps) => (
  <Layout.Header className={className} style={{ background: '#fff', padding: '0 24px' }}>
    <CollapsedSwitch isCollapsed={isCollapsed} onCollapsed={onCollapsed} />
    <div className="group">
      <Avatar className={'avatar'} shape="square" size={32} icon="user" />
      <Button>logout</Button>
    </div>
  </Layout.Header>
);

const InjectHeader = inject((store: IStore) => {
  const { isCollapsed, onCollapsed } = store.globalStore;
  return {
    isCollapsed,
    onCollapsed
  };
})(observer(Header));

interface ICollapsedSwitch extends IClassName, IHeaderProps {}

const CollapsedSwitch = styled((props: ICollapsedSwitch) => (
  <Icon
    className={props.className}
    type={props.isCollapsed ? 'menu-unfold' : 'menu-fold'}
    onClick={props.onCollapsed}
  />
))`
  font-size: 18px;
  &:hover {
    color: #1890ff;
  }
`;

export default styled(InjectHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .group {
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
