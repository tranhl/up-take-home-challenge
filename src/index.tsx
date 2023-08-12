import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { Box, Card, Typography } from "@mui/joy";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <Box
          display="flex"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Card>
            <Typography textAlign="center" level="h1">
              Something went wrong with the application
            </Typography>

            <Typography textAlign="center" level="body-lg">
              Please try again later 😞
            </Typography>
          </Card>
        </Box>
      }
    >
      <CssVarsProvider>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
