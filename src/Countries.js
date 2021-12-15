import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import CountryCard from "./CountryCard";
import { useTheme } from "./ThemeContext";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    let response = await fetch("https://restcountries.com/v2/all");
    let data = await response.json();
    setCountries(() => [...data]);
  };
  const darkTheme = useTheme();

  return (
    <CountriesContainer
      className={darkTheme ? "dark-theme-class" : "light-theme-class"}
    >
      {countries.length > 0 &&
        countries.map((country) => {
          return <CountryCard country={country} key={country.numericCode} />;
        })}
    </CountriesContainer>
  );
};

export default Countries;

const CountriesContainer = styled(motion.section)`
  min-height: 100vh;
  padding: 2rem 5% 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
`;
