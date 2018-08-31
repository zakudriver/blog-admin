import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@/styles';
import { Layout, Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface ISiderProps extends IClassName {
  isCollapsed?: boolean;
}

@inject(
  (store: IStore): ISiderProps => {
    const { isCollapsed } = store.globalStore;
    return {
      isCollapsed
    };
  }
)
@observer
class Sider extends React.Component<ISiderProps> {
  constructor(props: ISiderProps) {
    super(props);
  }

  public render() {
    return (
      <Layout.Sider theme={'light'} collapsed={this.props.isCollapsed}>
        <Logo />
        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <MenuItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </Layout.Sider>
    );
  }
}

interface ILogo extends IClassName {}

const Logo = styled((props: ILogo) => (
  <div className={props.className}>
    <Icon type="ant-design" />
  </div>
))`
  font-size: 50px;
  text-align: center;
  margin: 10px 0;
`;

export default styled(Sider)`
  background-color: #fff;
`;
