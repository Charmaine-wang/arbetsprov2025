import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/defaultTheme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  </React.StrictMode>
);
