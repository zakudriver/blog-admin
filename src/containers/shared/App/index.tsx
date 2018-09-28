import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import PrivateRoute from '@/containers/shared/PrivateRoute'

import { Loading } from '@/components/common';

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ '@/containers/shared/Login'),
  loading: Loading
});
const Main = Loadable({
  loader: () => import(/* webpackChunkName: "main" */ '@/containers/views/Main'),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notFound" */ '@/containers/shared/NotFound'),
  loading: Loading
});

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
