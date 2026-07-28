import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./styles.css";
import "./library/styles.css";
import "./seeds/skeuomorphic/tokens.css";
import "./docs/docs.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
