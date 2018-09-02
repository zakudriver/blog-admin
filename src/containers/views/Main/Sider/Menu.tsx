import * as React from 'react'
import styled from '@/styles'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

import { menu, IMenu } from '../menu'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

interface ISiderMenuProps extends IClassName {}

class SiderMenu extends React.Component<ISiderMenuProps> {
  public createMenu = (menuTree: IMenu[]) => {
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
            <Link to={i.path!}>{i.title}</Link>
          </MenuItem>
        )
      }
    })
  }

  public render() {
    const menuList = this.createMenu(menu)
    return (
      <Menu className={this.props.className} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
        {menuList}
      </Menu>
    )
  }
}

export default styled(SiderMenu)`
  .ant-menu-item > a {
    display: inline;
  }
`
