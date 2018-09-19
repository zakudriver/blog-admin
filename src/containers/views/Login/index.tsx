import * as React from 'react'
import { inject } from 'mobx-react'
import styled from '@/styles'

import LoginDrawer from '@/containers/views/Login/Drawer'
import LoginMain from '@/containers/views/Login/Main'

interface ILoginProps extends IClassName {
  // isDrawer: boolean;
  // onDrawer: () => void;
  webConfig: IGlobalStore.IWebConfig
}

interface ILoginState {
  clientWidth: number
  isDrawer: boolean
}

@inject(
  (store: IStore): ILoginProps => {
    const { webConfig } = store.globalStore
    // const { isDrawer, onDrawer } = store.loginStore;
    return {
      // isDrawer,
      // onDrawer,
      webConfig
    }
  }
)
class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props)
    this.state = {
      clientWidth: 0,
      isDrawer: false
    }
  }

  public componentDidMount() {
    this.setState({
      clientWidth: document.body.clientWidth
    })
    window.addEventListener('resize', this.resize)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  public resize = () => {
    this.setState({
      clientWidth: document.body.clientWidth
    })
  }

  public onDrawer = () => {
    this.setState({
      isDrawer: !this.state.isDrawer
    })
  }
  public closeDrawer = () => {
    if (this.state.isDrawer) {
      this.setState({
        isDrawer: false
      })
    }
  }
  
  public render() {
    return (
      <div className={this.props.className}>
        <LoginDrawer isDrawer={this.state.isDrawer} drawerWidth={this.props.webConfig.drawerWidth} />
        <LoginMain
          webConfig={this.props.webConfig}
          onDrawer={this.onDrawer}
          closeDrawer={this.closeDrawer}
          {...this.state}
        />
      </div>
    )
  }
}

export default styled(Login)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
