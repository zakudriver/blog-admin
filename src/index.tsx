import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
// import { Router } from 'react-router-dom';
// import { syncHistoryWithStore } from 'mobx-react-router';

import App from '@/containers/shared/App'
import * as store from '@/store'
import { ThemeProvider, styleVar } from '@/styles'
import '@/styles/global'
import registerServiceWorker from './registerServiceWorker'
// import '@/assets/css/reset.scss';
// import { createBrowserHistory } from 'history';

// const history = syncHistoryWithStore(createBrowserHistory(), store.routerStore);

const render = (Component: React.ComponentClass) => {
  ReactDOM.render(
    <ThemeProvider theme={styleVar}>
      <Provider {...store}>
        {/* <Router history={history}> */}
        <Component />
        {/* </Router> */}
      </Provider>
    </ThemeProvider>,
    document.getElementById('app') as HTMLElement
  )
}

render(App)
registerServiceWorker()
