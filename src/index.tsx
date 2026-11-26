import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./app";
import { GlobalStyles } from "./assets/globalStyles";
import { store } from "./store";

let root: ReactDOM.Root | null = null;

export default App;

export const mount = (
  Component: React.ComponentType = App,
  element: HTMLElement | null = document.getElementById("app"),
) => {
  if (!element) {
    throw new Error('Не найден элемент с id "app" для запуска приложения.');
  }

  root?.unmount();
  root = ReactDOM.createRoot(element);

  root.render(
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Component />
      </Provider>
    </>,
  );

  if (module.hot) {
    module.hot.accept("./app", () => {
      root?.render(
        <>
          <GlobalStyles />
          <Provider store={store}>
            <App />
          </Provider>
        </>,
      );
    });
  }
};

export const unmount = () => {
  root?.unmount();
  root = null;
};
