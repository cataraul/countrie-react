import { useState } from "react";
import Navbar from "./Navbar";
import Countries from "./Countries";
import SearchParams from "./SearchParams";
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <SearchParams />
      <Countries />
    </ThemeProvider>
  );
}

export default App;
