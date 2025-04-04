import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthcontextProvider } from "./context/Authcontext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthcontextProvider>
        <App />
      </AuthcontextProvider>
    </BrowserRouter>
  </StrictMode>
);
