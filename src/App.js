import { DataProvider } from "./ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Countries from "./Countries";
import Details from "./Details";
import ButtonUp from "./ButtonUp";

function App() {
  return (
    <Router>
      <DataProvider>
        <AnimatePresence>
          <Navbar key="navbar" />
          <Routes>
            <Route
              exact
              path="/"
              element={<Countries />}
              key="countries-container"
            />
            <Route
              exact
              path="/details/:id"
              element={<Details />}
              key="details-container"
            />
          </Routes>
          <ButtonUp />
        </AnimatePresence>
      </DataProvider>
    </Router>
  );
}

export default App;
