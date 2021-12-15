import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import SearchParams from "./SearchParams";
import { motion } from "framer-motion";
import CountryCard from "./CountryCard";
import { useTheme, useCountriesData } from "./ThemeContext";

const Countries = () => {
  const { countries, setCountries } = useCountriesData();
  const [countriesCoppy, setCountriesCoppy] = useState([]);

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    let response = await fetch("https://restcountries.com/v2/all");
    let data = await response.json();
    setCountries(() => [...data]);
    setCountriesCoppy(() => [...data]);
    console.log(countriesCoppy);
  };
  const darkTheme = useTheme();

  return (
    <>
      <SearchParams
        countriesCoppy={countriesCoppy}
        setCountriesCoppy={setCountriesCoppy}
      />

      <CountriesContainer
        className={darkTheme ? "dark-theme-class" : "light-theme-class"}
      >
        {countriesCoppy.length > 0 &&
          countriesCoppy.map((country) => {
            return <CountryCard country={country} key={country.numericCode} />;
          })}
      </CountriesContainer>
    </>
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
  @media only screen and (max-width: 1135px) {
    justify-content: space-around;
  }
`;
