import * as React from 'react'
import styled from '@/styles'
import { observer, inject } from 'mobx-react'
import { Layout, Avatar } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IconBtn } from '@/components/common'

interface IHeaderProps extends IClassName {
  isCollapsed?: boolean
  onCollapsed?: () => void
  children: JSX.Element
}

interface IHeaderRouteProps extends IHeaderProps, RouteComponentProps<any> {}

const Header = ({ className, isCollapsed, onCollapsed, history, children }: IHeaderRouteProps) => {
  return (
    <Layout.Header className={className} style={{ background: '#fff', padding: '0 24px' }}>
      <div className="header__left">
        <IconBtn type={isCollapsed ? 'menu-unfold' : 'menu-fold'} size="18" color={false} onClick={onCollapsed!} />
      </div>
      <div className="header__center">{children}</div>
      <div className="header__right">
        <Avatar className={'avatar'} shape="square" size={32} icon="user" />
        <IconBtn type="logout" size="18" color={false} onClick={() => history.push('/login')} />
      </div>
    </Layout.Header>
  )
}

const InjectHeader = inject((store: IStore) => {
  const { isCollapsed, onCollapsed } = store.globalStore
  return {
    isCollapsed,
    onCollapsed
  }
})(observer(withRouter(Header)))

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
      width: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 1px solid #eee;
      padding-left: 14px;
      height: 40px;
    }
  }
`
