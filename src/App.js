import { useState } from "react";
import Navbar from "./Navbar";
import Countries from "./Countries";
import { DataProvider } from "./ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./Details";

function App() {
  return (
    <Router>
      <DataProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
