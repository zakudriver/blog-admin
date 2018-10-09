import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, reaction } from 'mobx';
import { Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { menu, IMenu, IMenuTree } from '@/containers/views/Main/menu';
import { buildTree } from '@/utils';
import { withRouterProps } from '@/components/utils/withComponents';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface ISiderMenuProps extends IClassName, IRouterProps {
  isCollapsed?: boolean;
  currentRouter?: string;
}

interface ISiderMenuState {
  selectedKeys: string[];
  openKeys: string[];
}

@withRouterProps
@inject(
  (store: IStore): ISiderMenuProps => {
    const { isCollapsed, currentRouter } = store.globalStore;
    return { isCollapsed, currentRouter };
  }
)
@observer
class SiderMenu extends React.Component<ISiderMenuProps, ISiderMenuState> {
  constructor(props: ISiderMenuProps) {
    super(props);
    this.state = {
      selectedKeys: ['1'],
      openKeys: ['1']
    };
    reaction(
      () => this.props.currentRouter!,
      currentRouter => {
        this.onCurrentMenu(currentRouter);
      }
    );
  }

  @computed
  get menuTree() {
    return buildTree<IMenu, IMenuTree>(menu);
  }

  public onMenu = ({ key }: ClickParam) => {
    const selectedMenu = menu.find(val => key === val.key);
    if (selectedMenu && selectedMenu.path && selectedMenu.path) {
      this.props.history!.push(selectedMenu.path);
    }
  };

  public onCurrentMenu = (path: string) => {
    const selectedMenu = menu.find(val => path === val.path)!;
    if (selectedMenu.parentKey) {
      this.setState({
        openKeys: [selectedMenu!.parentKey!],
        selectedKeys: [selectedMenu.key]
      });
    } else {
      this.setState({
        selectedKeys: [selectedMenu.key]
      });
    }
  };

  public componentWillMount() {
    this.onCurrentMenu(this.props.location!.pathname);
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
    return (
      <Menu
        onClick={this.onMenu}
        selectedKeys={this.state.selectedKeys}
        openKeys={this.state.openKeys}
        inlineCollapsed={this.props.isCollapsed}
        mode="inline"
      >
        {this.createMenu(this.menuTree)}
      </Menu>
    );
  }
}

export default SiderMenu;
