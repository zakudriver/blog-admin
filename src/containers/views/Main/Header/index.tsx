import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout, Avatar } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import styled from '@/styles';
import { IconBtn } from '@/components/common';
import { TokenField } from '@/constants';
import Badgetip from './Badgetip';

interface IHeaderProps extends IClassName {
  isCollapsed?: boolean;
  onCollapsed?: () => void;
  message?: MessageStore.IMessage[];
  config?: GlobalStore.IConfig;
  onAlready?: () => void;
  children: JSX.Element;
  avatar: string;
}

interface IHeaderRouteProps extends IHeaderProps, RouteComponentProps<any> {}

const Header = ({
  className,
  isCollapsed,
  onCollapsed,
  history,
  children,
  avatar,
  message,
  config,
  onAlready
}: IHeaderRouteProps) => {
  return (
    <Layout.Header className={className} style={{ background: '#fff', padding: '0 24px' }}>
      <div className="header__left">
        <IconBtn type={isCollapsed ? 'menu-unfold' : 'menu-fold'} size="18" color={false} onClick={onCollapsed!} />
      </div>
      <div className="header__center">{children}</div>
      <div className="header__right">
        <Badgetip source={message!} config={config!} onAlready={onAlready!} />
        <Avatar className={'avatar'} shape="square" size={32} icon="user" src={avatar} />
        <IconBtn
          type="logout"
          size="18"
          color={false}
          onClick={() => {
            history.push('/login');
            // location.href = '/login';
            localStorage.removeItem(TokenField);
          }}
        />
      </div>
    </Layout.Header>
  );
};

const InjectHeader = inject((store: IStore) => {
  const { isCollapsed, onCollapsed, config } = store.globalStore;
  const { message, onAlready } = store.messageStore;

  return {
    isCollapsed,
    onCollapsed,
    message,
    config,
    onAlready
  };
})(observer(withRouter(Header)));

export default styled(InjectHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header {
    &__left {
      border-right: 1px solid #eee;
      height: 40px;
      line-height: 40px;
      padding-right: 14px;
    }
    &__center {
      flex-grow: 1;
      padding: 0 20px;
    }
    &__right {
      width: 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 1px solid #eee;
      padding-left: 14px;
      height: 40px;
    }
  }
`;
