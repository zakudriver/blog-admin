import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import '@/assets/css/reset.scss';
import '@/assets/css/base.scss';

import { Provider } from 'mobx-react';

import App from '@/containers/shared/App';
import * as store from '@/store';
import { ThemeProvider, styleVar } from '@/styles';

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
