import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
);
