import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import * as Loadable from 'react-loadable';
import PrivateRoute from '@/containers/shared/PrivateRoute';
// import { AppLoading } from '@/components/common';

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ '@/containers/shared/Login'),
  loading: () => null
});
const Main = Loadable({
  loader: () => import(/* webpackChunkName: "main" */ '@/containers/views/Main'),
  loading: () => null
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notFound" */ '@/containers/shared/NotFound'),
  loading: () => null
});

interface IAppProps {
  getConfig: () => void;
  isSpin: boolean;
}

@inject(
  (store: IStore): IAppProps => {
    const { getConfig, isSpin } = store.globalStore;
    return { getConfig, isSpin };
  }
)
@observer
class App extends React.Component<IAppProps> {
  public componentDidMount() {
    this.props.getConfig();
  }

  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          {/* <PrivateRoute path="/" component={Main} /> */}
          <Route path="/" exact render={() => <Redirect to={'/article'} />} />
          <PrivateRoute path="/" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
