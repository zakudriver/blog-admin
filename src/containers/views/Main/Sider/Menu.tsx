import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import styled from '@/styles';
import { Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { menu, IMenu, IMenuTree } from '../menu';
import { buildTree } from '@/unit';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface ISiderMenuProps extends IClassName {
  routerStore?: RouterStore;
  isCollapsed?: boolean;
}

@inject(
  (store: IStore): ISiderMenuProps => {
    const { routerStore } = store;
    const { isCollapsed } = store.globalStore;
    return { routerStore, isCollapsed };
  }
)
@observer
class SiderMenu extends React.Component<ISiderMenuProps> {
  @computed
  get currentRoute() {
    return this.props.routerStore!.location.pathname;
  }
  @computed
  get menuTree() {
    return buildTree<IMenu, IMenuTree>(menu);
  }

  public onRedirect = ({ key }: ClickParam) => {
    const selectedMenu = menu.find(val => key === val.key);
    if (selectedMenu && selectedMenu.path && selectedMenu.path !== this.currentRoute) {
      this.props.routerStore!.history.push(selectedMenu.path);
      // location.href = selectedMenu.path;
    }
  };

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
        );
      } else {
        return (
          <MenuItem key={i.key}>
            <Icon type={i.icon} />
            <span>{i.title}</span>
          </MenuItem>
        );
      }
    });
  };

  public render() {
    const menuList = this.createMenu(this.menuTree);

    return (
      <Menu
        className={this.props.className}
        onClick={this.onRedirect}
        defaultSelectedKeys={['1']}
        inlineCollapsed={this.props.isCollapsed}
        mode="inline"
      >
        {menuList}
      </Menu>
    );
  }
}

export default styled(SiderMenu)``;
