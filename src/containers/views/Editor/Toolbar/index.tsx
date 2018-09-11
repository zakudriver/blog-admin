import * as React from 'react'
import { Menu, Dropdown, Button } from 'antd'
import styled from '@/styles'

interface IToolbarProps extends IClassName {}

class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props)
  }

  public render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={this.props.className}>
        <Dropdown overlay={menu} placement="topLeft">
          <Button>topLeft</Button>
        </Dropdown>
      </div>
    )
  }
}

export default styled(Toolbar)`
  background-color: #ccc;
`
