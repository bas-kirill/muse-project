import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ThemeProvider } from "shared/dark-mode/use-dark-mode";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </ThemeProvider>
);
