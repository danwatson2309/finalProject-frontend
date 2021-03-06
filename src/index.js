import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./firebase/Auth";
import { AdminUsersProvider } from "./contexts/adminUsersContext";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <AdminUsersProvider>
        <App />
      </AdminUsersProvider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
