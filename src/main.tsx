import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/_reset.scss";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/themes.scss";
import './styles/icons.scss';
import './styles/media.scss';
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
