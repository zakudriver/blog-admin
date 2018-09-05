import * as React from 'react'
import styled from '@/styles'
import { observer, inject } from 'mobx-react'
import { Layout, Icon, Button, Avatar } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface IHeaderProps extends IClassName {
  isCollapsed?: boolean
  onCollapsed?: () => void
}

interface IHeaderRouteProps extends IHeaderProps, RouteComponentProps<any> {}

const Header = ({ className, isCollapsed, onCollapsed, history }: IHeaderRouteProps) => {
  function signOut() {
    history.push('/login')
  }

  return (
    <Layout.Header
      className={className}
      style={{ background: '#fff', padding: '0 24px'}}
    >
      <CollapsedSwitch isCollapsed={isCollapsed} onCollapsed={onCollapsed} />
      <div className="group">
        <Avatar className={'avatar'} shape="square" size={32} icon="user" />
        <Button onClick={signOut}>sign out</Button>
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
`

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
`
