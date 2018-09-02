import * as React from 'react'
import { inject, observer } from 'mobx-react'
import styled from '@/styles'
import { Layout, Icon } from 'antd'

import SiderMenu from './Menu'

interface ISiderProps extends IClassName {
  isCollapsed?: boolean
}

@inject(
  (store: IStore): ISiderProps => {
    const { isCollapsed } = store.globalStore
    return {
      isCollapsed
    }
  }
)
@observer
class Sider extends React.Component<ISiderProps> {
  constructor(props: ISiderProps) {
    super(props)
  }

  public handleClick=(e:React.MouseEvent<HTMLDivElement>)=>{
    console.log(e)
  }

  public render() {
    return (
      <Layout.Sider theme={'light'} onClick={this.handleClick} collapsed={this.props.isCollapsed}>
        <Logo />
        <SiderMenu />
      </Layout.Sider>
    )
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
`

export default styled(Sider)`
  background-color: #fff;
`
