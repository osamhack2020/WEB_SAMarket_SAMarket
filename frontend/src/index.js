/* React Project 에서 가장 처음 호출되는 영역 */
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
// Redux 영역
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./views/modules";
// 실제 Component 영역
import "./index.css";
import Pages from "./views/pages/index";
import ReduxThunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

const customHistory = createBrowserHistory();

const devTools = // redux 개발자 도구: chrome 확장 Redux Devtools 설치
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// react 에서 '하나의 Application 에는 하나의 Store.'
const store = createStore(
  rootReducer,
  devTools,
  applyMiddleware(ReduxThunk.withExtraArgument({ history: customHistory }))
);

ReactDOM.render(
  <Provider store={store}>
    <Pages history={customHistory} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
