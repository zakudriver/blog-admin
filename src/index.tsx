import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, inject, observer } from 'mobx-react';
import { configure } from 'mobx';

import App from '@/containers/shared/App';
import * as store from '@/store';
import { ThemeProvider } from '@/styles';
import { IStyleInterface } from '@/styles/variable';
import GlobalStyleComponent from '@/styles/global';
import registerServiceWorker from './registerServiceWorker';

import '@/styles/less/index.less';
configure({ enforceActions: 'always' });

const render = (Component: React.ComponentClass<any>) => {
  const InjectComponent = inject((s: IStore) => {
    const { config } = s.globalStore;
    return { primaryColor: config.primaryColor, drawerColor: config.drawerColor };
  })(
    observer((props: IStyleInterface) => (
      <ThemeProvider theme={props}>
        <>
          <GlobalStyleComponent />
          <Component />
        </>
      </ThemeProvider>
    ))
  );

  ReactDOM.render(
    <Provider {...store}>
      <InjectComponent />
    </Provider>,
    document.getElementById('app') as HTMLElement
  );
};

render(App);
registerServiceWorker();

import { socket } from '@/service/socketIO';

socket.on('connect', () => {
  console.log('connect');
});

socket.on('news', (data: string) => {
  console.log(data);
});
