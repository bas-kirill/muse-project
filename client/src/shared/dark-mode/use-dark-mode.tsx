import { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";
import { DARK_MODE } from "shared/config/frontend";

interface ThemeContextProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    window.localStorage.getItem(DARK_MODE) === "true",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      window.localStorage.setItem(DARK_MODE, newMode ? "true" : "false");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkMode = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a ThemeProvider');
  }
  return context;
};

// export const useDarkMode = () => {
//   const [darkMode, setDarkMode] = useState<boolean>(
//     window.localStorage.getItem(DARK_MODE) == "true" ? true : false,
//   );
//
//   const toggleDarkMode = () => {
//     setDarkMode((prevMode) => {
//       const newMode = !prevMode;
//       window.localStorage.setItem(DARK_MODE, newMode ? "true" : "false");
//       document.documentElement.classList.toggle("dark", newMode);
//       window.location.reload();  // need to rerender header and other components
//       return newMode;
//     });
//   };
//
//   useEffect(() => {
//     window.localStorage.setItem(DARK_MODE, darkMode ? "true" : "false");
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);
//
//   return { darkMode, toggleDarkMode };
// };
