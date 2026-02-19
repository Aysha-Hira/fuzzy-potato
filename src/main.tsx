// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import { M3Provider } from "m3r";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <M3Provider themeColor="#148fb5" themeMode="light">
//       <App />
//     </M3Provider>
//   </StrictMode>,
// );

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import { M3Provider } from "m3r";
// import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

// // This component connects your ThemeContext to M3Provider
// const ThemedApp = () => {
//   const { mode, color } = useTheme(); // Get both mode AND color from context

//   console.log("🎨 ThemedApp rendering with:", { mode, color }); // Debug log

//   return (
//     <M3Provider
//       themeColor={color} // User's chosen color (e.g., '#148fb5', '#f44336', etc.)
//       themeMode={mode} // User's chosen mode ('light' or 'dark')
//     >
//       <App />
//     </M3Provider>
//   );
// };

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ThemeProvider>
//       <ThemedApp />
//     </ThemeProvider>
//   </StrictMode>,
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { M3Provider } from "m3r";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const ThemedApp = () => {
  const { mode } = useTheme();

  return (
    <M3Provider
      themeColor="#148fb5" // Fixed color
      themeMode={mode}
    >
      <App />
    </M3Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  </StrictMode>,
);
