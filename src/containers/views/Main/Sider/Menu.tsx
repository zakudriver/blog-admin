import * as React from 'react'
import { inject, observer, propTypes } from 'mobx-react'
import { computed } from 'mobx'
import styled from '@/styles'
import { Menu, Icon } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { menu, IMenu, IMenuTree } from '../menu'
import { buildTree } from '@/unit'
import { withRouter } from 'react-router-dom'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

import { RouteComponentProps } from 'react-router'

interface ISiderMenuProps extends IClassName {
  routerStore?: RouterStore
  isCollapsed?: boolean
}

@inject(
  (store: IStore): ISiderMenuProps => {
    // const { routerStore } = store
    const { isCollapsed } = store.globalStore
    return { isCollapsed }
  }
)
@observer
class SiderMenu extends React.Component<ISiderMenuProps> {
  // @computed
  // get currentRoute() {
  //   return this.props.location!.pathname
  // }
  @computed
  get menuTree() {
    return buildTree<IMenu, IMenuTree>(menu)
  }

  // public onRedirect = ({ key }: ClickParam) => {
  //   const selectedMenu = menu.find(val => key === val.key)
  //   if (selectedMenu && selectedMenu.path && selectedMenu.path !== this.currentRoute) {
  //     this.props.history!.push(selectedMenu.path)
  //     console.log(this.props)
  //   }
  // }

  public createMenu = (menuTree: IMenuTree[]) => {
    return menuTree.map(i => {
      if (i.children) {
        return (
          <SubMenu
            key={i.key}
            title={
              <span>
                <Icon type={i.icon} />
                <span>{i.title}</span>
              </span>
            }
          >
            {this.createMenu(i.children)}
          </SubMenu>
        )
      } else {
        return (
          <MenuItem key={i.key}>
            <Icon type={i.icon} />
            <span>{i.title}</span>
          </MenuItem>
        )
      }
    })
  }

  public render() {
    const WithRouterMenuContainer = withRouter(MenuContainer)
    const menuList = this.createMenu(this.menuTree)

    return <WithRouterMenuContainer isCollapsed={this.props.isCollapsed}>{menuList}</WithRouterMenuContainer>
  }
}

interface IMenuContainerProps extends RouteComponentProps<any> {
  children: React.ReactNode
  // onRedirect: ({ key }: ClickParam) => void
  isCollapsed: boolean | undefined
}

const MenuContainer = (props: IMenuContainerProps) => {
  function onRedirect({ key }: ClickParam) {
    const selectedMenu = menu.find(val => key === val.key)
    if (selectedMenu && selectedMenu.path && selectedMenu.path !== props.location.pathname) {
      props.history.push(selectedMenu.path)
      console.log(selectedMenu.path)
    }
  }
  return (
    <Menu onClick={onRedirect} defaultSelectedKeys={['1']} inlineCollapsed={props.isCollapsed} mode="inline">
      {props.children}
    </Menu>
  )
}

// @observer
// class MenuContainer extends React.Component<IMenuContainerProps> {
//   @computed
//   get currentRoute() {
//     return this.props.location.pathname
//   }

//   public onRedirect = ({ key }: ClickParam) => {
//     const selectedMenu = menu.find(val => key === val.key)
//     if (selectedMenu && selectedMenu.path && selectedMenu.path !== this.currentRoute) {
//       this.props.history.push(selectedMenu.path)
//     }
//   }

//   public render() {
//     return (
//       <Menu
//         onClick={this.onRedirect}
//         defaultSelectedKeys={['1']}
//         inlineCollapsed={this.props.isCollapsed}
//         mode="inline"
//       >
//         {this.props.children}
//       </Menu>
//     )
//   }
// }

export default styled(SiderMenu)``
