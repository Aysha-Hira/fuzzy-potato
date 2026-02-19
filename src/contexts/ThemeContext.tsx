// import React, { createContext, useContext, useState, useEffect } from "react";

// type ThemeMode = "light" | "dark";

// interface ThemeContextType {
//   mode: ThemeMode;
//   toggleTheme: () => void;
//   setMode: (mode: ThemeMode) => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within ThemeProvider");
//   }
//   return context;
// };

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // Check localStorage or system preference for initial theme
//   const getInitialTheme = (): ThemeMode => {
//     const savedTheme = localStorage.getItem("theme") as ThemeMode;
//     if (savedTheme) return savedTheme;

//     // Check system preference
//     if (
//       window.matchMedia &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches
//     ) {
//       return "dark";
//     }
//     return "light";
//   };

//   const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

//   // Update localStorage when theme changes
//   useEffect(() => {
//     localStorage.setItem("theme", mode);
//   }, [mode]);

//   const toggleTheme = () => {
//     setMode((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme, setMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// src/contexts/ThemeContext.tsx
// import React, { createContext, useContext, useState, useEffect } from "react";

// type ThemeMode = "light" | "dark";

// interface ThemeContextType {
//   mode: ThemeMode;
//   color: string;
//   toggleTheme: () => void;
//   setColor: (color: string) => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within ThemeProvider");
//   }
//   return context;
// };

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // Load from localStorage or use defaults
//   const [mode, setMode] = useState<ThemeMode>(() => {
//     const saved = localStorage.getItem("themeMode");
//     return (saved as ThemeMode) || "light";
//   });

//   const [color, setColor] = useState<string>(() => {
//     const saved = localStorage.getItem("themeColor");
//     return saved || "#148fb5"; // Default color
//   });

//   // Save to localStorage when changed
//   useEffect(() => {
//     localStorage.setItem("themeMode", mode);
//   }, [mode]);

//   useEffect(() => {
//     localStorage.setItem("themeColor", color);
//   }, [color]);

//   const toggleTheme = () => {
//     setMode((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ mode, color, toggleTheme, setColor }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("themeMode");
    return (saved as ThemeMode) || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
