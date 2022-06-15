import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { mySaga } from "./saga";
import { dataSlice } from "./redux";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: dataSlice.reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(mySaga);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
