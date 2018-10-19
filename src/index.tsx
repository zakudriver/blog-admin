import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';

import App from '@/containers/shared/App';
import * as store from '@/store';
import { ThemeProvider, styleVar } from '@/styles';
import '@/styles/global';
import registerServiceWorker from './registerServiceWorker';

// import '@/assets/sass/reset.scss'
configure({ enforceActions: true });

const render = (Component: React.ComponentClass) => {
  ReactDOM.render(
    <ThemeProvider theme={styleVar}>
      <Provider {...store}>
        <Component />
      </Provider>
    </ThemeProvider>,
    document.getElementById('app') as HTMLElement
  );
};

render(App);
registerServiceWorker();
