import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import ContextProviders from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ContextProviders>
      <App />
    </ContextProviders>
  </Router>
);
