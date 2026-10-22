import React from 'react';
import ReactDOM from 'react-dom/client';

import { GlobalStyles } from './assets/globalStyles';
import App from './app';

let root: ReactDOM.Root | null = null;

export default App;

export const mount = (
  Component: React.ComponentType = App,
  element: HTMLElement | null = document.getElementById('app'),
) => {
  if (!element) {
    throw new Error('Не найден элемент с id "app" для запуска приложения.');
  }

  root?.unmount();
  root = ReactDOM.createRoot(element);

  root.render(
    <>
      <GlobalStyles />
      <Component />
    </>
  )

  if (module.hot) {
    module.hot.accept('./app', () => {
      root?.render(
      <>
        <GlobalStyles />
        <App />
      </>
      );
    });
  }
};

export const unmount = () => {
  root?.unmount();
  root = null;
};