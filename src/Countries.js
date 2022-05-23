import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchParams from "./SearchParams";
import { motion } from "framer-motion";
import CountryCard from "./CountryCard";
import { useTheme, useCountriesData } from "./ThemeContext";
import { v4 as uuidv4 } from "uuid";

const Countries = () => {
  //Getting from Context the function that sets the country array
  const { setCountries } = useCountriesData();
  //DarkTheme fron Context
  const darkTheme = useTheme();
  //Making a coppy of the initial countries array to filter and change data
  const [countriesCoppy, setCountriesCoppy] = useState([]);
  //Loading state
  const [isLoading, setLoading] = useState(true);
  //Maximum nuber of items
  const [maxNumber, setMaxNumber] = useState(24);

  //On component render get data from API
  useEffect(() => {
    getAllCountries();
  }, []);
  //Function that fetches data from the api
  const getAllCountries = async () => {
    let response = await fetch("https://restcountries.com/v2/all");
    let data = await response.json();
    setCountries(() => [...data]);
    setCountriesCoppy(() => [...data]);
    setLoading((loading) => !loading);
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={darkTheme ? "dark-theme-class" : "light-theme-class"}
      >
        <h1>Loading...</h1>
        <div className="lds-dual-ring"></div>
      </div>
    );
  } else {
    return (
      <>
        <div
          animate={{ y: 0 }}
          initial={{ y: "100vw" }}
          transition={{ ease: "easeIn", duration: 1.5 }}
          exit={{
            opacity: 0,
            y: "100vw",
            transition: { duration: 1.5 },
          }}
          key="countries-container"
        >
          <SearchParams
            countriesCoppy={countriesCoppy}
            setCountriesCoppy={setCountriesCoppy}
          />

          <CountriesContainer
            className={darkTheme ? "dark-theme-class" : "light-theme-class"}
          >
            {countriesCoppy.length > 0 &&
              countriesCoppy.slice(0, maxNumber).map((country) => {
                return <CountryCard country={country} key={uuidv4()} />;
              })}
          </CountriesContainer>
        </div>
        <ButtonContainer
          className={darkTheme ? "dark-theme-class" : "light-theme-class"}
        >
          <button
            onClick={() => setMaxNumber(maxNumber + 24)}
            className={darkTheme ? "dark-theme-class" : "light-theme-class"}
          >
            Show More...
          </button>
        </ButtonContainer>
      </>
    );
  }
};

export default Countries;

const CountriesContainer = styled(motion.section)`
  min-height: 100vh;
  padding: 2rem 5% 0 5%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  @media only screen and (max-width: 1135px) {
    justify-content: space-around;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 1rem 5%;
  button {
    border: none;
    font-size: 2rem;
    &:hover {
      cursor: pointer;
    }
  }
`;
