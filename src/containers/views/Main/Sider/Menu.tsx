import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Menu, Icon } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { menu, IMenu, IMenuTree } from '../menu'
import { buildTree } from '@/unit'
import { withRouterProps } from '@/components/unit/WithComponents'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

interface ISiderMenuProps extends IClassName, IRouteComponentProps {
  routerStore?: RouterStore
  isCollapsed?: boolean
}

interface ISiderMenuState {
  defaultSelectedKeys: string[]
  defaultOpenKeys: string[]
}

@inject(
  (store: IStore): ISiderMenuProps => {
    const { isCollapsed } = store.globalStore
    return { isCollapsed }
  }
)
@observer
class SiderMenu extends React.Component<ISiderMenuProps, ISiderMenuState> {
  constructor(props: ISiderMenuProps) {
    super(props)
    this.state = {
      defaultSelectedKeys: ['1'],
      defaultOpenKeys: ['1']
    }
  }

  @computed
  get menuTree() {
    return buildTree<IMenu, IMenuTree>(menu)
  }

  public onRedirect = ({ key }: ClickParam) => {
    const selectedMenu = menu.find(val => key === val.key)
    if (selectedMenu && selectedMenu.path && selectedMenu.path !== this.props.location!.pathname) {
      this.props.history!.push(selectedMenu.path)
    }
  }

  public onOpenCurrent = (path: string) => {
    const selectedMenu = menu.find(val => path === val.path)!
    if (selectedMenu.parentKey) {
      this.setState({
        defaultOpenKeys: [selectedMenu!.parentKey!],
        defaultSelectedKeys: [selectedMenu.key]
      })
    } else {
      this.setState({
        defaultSelectedKeys: [selectedMenu.key]
      })
    }
  }


  componentWillMount() {
    this.onOpenCurrent(this.props.location!.pathname)
  }

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
    return (
      <Menu
        onClick={this.onRedirect}
        defaultSelectedKeys={this.state.defaultSelectedKeys}
        defaultOpenKeys={this.state.defaultOpenKeys}
        inlineCollapsed={this.props.isCollapsed}
        mode="inline"
      >
        {this.createMenu(this.menuTree)}
      </Menu>
    )
  }
}

export default withRouterProps<ISiderMenuProps>(SiderMenu)
