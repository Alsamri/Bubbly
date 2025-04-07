import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthcontextProvider } from "./context/Authcontext.tsx";
import SocketContextProvider from "./context/socketContect.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthcontextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthcontextProvider>
  </BrowserRouter>
);
