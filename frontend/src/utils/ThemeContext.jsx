/**
 @usage
 const { theme, toggleTheme } = useContext(ThemeContext);
 toggleTheme("system"); // system, light, dark
 */


import React, { createContext, useEffect, useState } from "react";
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ name: "light", value: MD3LightTheme });

  const toggleTheme = (theme) => {
    switch (theme.toLowerCase()) {
      case "light":
        setTheme({ name: "light", value: MD3LightTheme });
        break;
      case "dark":
        setTheme({ name: "dark", value: MD3DarkTheme });
        break;
      case "system":
        const prefersDarkMode = window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        prefersDarkMode ? setTheme({ name: "system", value: MD3DarkTheme }) :
          setTheme({ name: "system", value: MD3LightTheme });
        break;
    }
    AsyncStorage.setItem("theme", theme);
  };

  useEffect(() => {
    (async () => {
      const prefers = await AsyncStorage.getItem("theme");
      if (prefers) {
        toggleTheme(prefers);
      } else {
        toggleTheme("light");
      }
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <PaperProvider theme={theme.value}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
