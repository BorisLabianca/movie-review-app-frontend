import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import ThemeProvider from "./context/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ThemeProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Router>
);
