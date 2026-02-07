import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { M3Provider } from "m3r";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <M3Provider themeColor="#148fb5" themeMode="light">
      <App />
    </M3Provider>
  </StrictMode>,
);
