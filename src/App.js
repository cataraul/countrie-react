import { DataProvider } from "./ThemeContext";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Countries from "./Countries";
import Details from "./Details";
import ButtonUp from "./ButtonUp";

function App() {
  const location = useLocation();
  return (
    <DataProvider>
      <AnimatePresence>
        <Navbar key="navbar" />
        <Routes>
          <Route
            location={location}
            key={location.key}
            exact
            path="/countries/"
            element={<Countries />}
          />
          <Route
            exact
            path="/details/:id/"
            element={<Details />}
            key="details-container"
          />
        </Routes>
        <ButtonUp />
      </AnimatePresence>
    </DataProvider>
  );
}

export default App;
