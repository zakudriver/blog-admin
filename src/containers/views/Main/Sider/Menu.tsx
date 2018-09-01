import * as React from 'react'
import styled from '@/styles'
import { Menu, Icon } from 'antd'

import { menu, IMenu } from '../menu'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

class SiderMenu extends React.Component {
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
            <span>{i.title}</span>
          </MenuItem>
        )
      }
    })
  }

  public render() {
    const menuList = this.createMenu(menu)
    return (
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
        {menuList}
      </Menu>
    )
  }
}

export default styled(SiderMenu)``
