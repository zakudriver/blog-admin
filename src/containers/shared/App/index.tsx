import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Loadable from 'react-loadable'

import { Loading } from '@/components'

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ '@/containers/views/Login'),
  loading: Loading
})
const Main = Loadable({
  loader: () => import(/* webpackChunkName: "main" */ '@/containers/views/Main'),
  loading: Loading
})

class App extends React.Component<any> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Main} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
