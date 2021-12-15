import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();
const DataContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}
export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}
export function useCountriesData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  const [countries, setCountries] = useState([]);

  const toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <DataContext.Provider value={{ countries, setCountries }}>
        <ThemeUpdateContext.Provider value={toggleTheme}>
          {children}
        </ThemeUpdateContext.Provider>
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}
