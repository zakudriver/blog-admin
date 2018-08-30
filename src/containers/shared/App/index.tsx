import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Loadable from 'react-loadable'
// import { inject } from 'mobx-react'

import { Loading } from '@/components'

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ '@/containers/views/Login'),
  loading: Loading
})
const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ '@/containers/views/Home'),
  loading: Loading
})

class App extends React.Component<any> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
