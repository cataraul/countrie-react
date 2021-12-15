import React, { useContext, useState } from "react";

//Creating Contexts(for the current theme, to change the theme and get all the current countries data)
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

//Exporting function DataProvider that returns the contexts,providers with values so that App.js looks cleaner
export function DataProvider({ children }) {
  const getTheme = JSON.parse(localStorage.getItem("darkTheme"));
  const [darkTheme, setDarkTheme] = useState(getTheme);

  const [countries, setCountries] = useState([]);

  const toggleTheme = () => {
    localStorage.setItem("darkTheme", !darkTheme);
    setDarkTheme((prevTheme) => !prevTheme);
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
