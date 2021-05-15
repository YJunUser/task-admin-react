import "wdyr";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DevTools, loadServer } from "jira-dev-tool";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.less";
import { AppProviders } from "context";

moment.locale("zh-cn");

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools></DevTools>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
