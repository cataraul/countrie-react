import { DataProvider } from "./ThemeContext";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Countries from "./Countries";
import Details from "./Details";
import ButtonUp from "./ButtonUp";

function App() {
  const location = useLocation();
  return (
    <Router>
      <DataProvider>
        <AnimatePresence>
          <Navbar key="navbar" />
          <Routes location={location} key={location.key}>
            <Route
              exact
              path="/countries/"
              element={<Countries />}
              key="countries-container"
            />
            <Route
              exact
              path="/countries/details/:id/"
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
