import React, { useState, useEffect } from "react";
import { useTheme, useCountriesData } from "./ThemeContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Details = () => {
  const params = useParams().id.toLowerCase();
  const [countryData, setCountryData] = useState([]);
  const darkTheme = useTheme();

  useEffect(() => {
    getCountryData();
  }, []);
  let populationNumber;
  const getCountryData = async () => {
    let response = await fetch(`https://restcountries.com/v2/name/${params}`);
    let data = await response.json();
    setCountryData(() => [...data]);
    if (countryData.length > 0) {
      populationNumber = countryData[0].population
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  return (
    countryData.length > 0 && (
      <DetailsSection
        className={darkTheme ? "dark-theme-class" : "light-theme-class"}
      >
        <ButtonContainer>
          <Link to="/">
            <button
              className={
                darkTheme ? "dark-theme-class-lighter" : "light-theme-class"
              }
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Go Back
            </button>
          </Link>
        </ButtonContainer>
        <DetailsContainer>
          <ImageContainer
            style={{ backgroundImage: `url(${countryData[0].flag})` }}
          ></ImageContainer>
          <CountryDescription>
            <h1>{countryData[0].name}</h1>
            <div>
              <p>
                <Span>Native Name:</Span>
                {countryData[0].nativeName}
              </p>
              <p>
                <Span>Population:</Span>
                {populationNumber}
              </p>
              <p>
                <Span>Region:</Span>
                {countryData[0].region}
              </p>
              <p>
                <Span>Sub Region:</Span>
                {countryData[0].subregion}
              </p>
              <p>
                <Span>Capital:</Span>
                {countryData[0].capital}
              </p>
              <p>
                <Span>Top Level Domain:</Span>
                {countryData[0].topLevelDomain}
              </p>
              <p>
                <Span>Currencies:</Span>
                {countryData[0].currencies.map((currency) => {
                  return <span>{currency.name}</span>;
                })}
              </p>
              <p>
                <Span>Languages:</Span>
                {countryData[0].languages.map((language) => {
                  return <span>{language.name} </span>;
                })}
              </p>
            </div>
            <ul>
              <p>Border Countries:</p>
              {countryData[0].borders ? (
                countryData[0].borders.map((border) => {
                  return <li>{border}</li>;
                })
              ) : (
                <p>This country has no borders.</p>
              )}
            </ul>
          </CountryDescription>
        </DetailsContainer>
      </DetailsSection>
    )
  );
};

export default Details;

const DetailsSection = styled(motion.section)`
  min-height: 90vh;
`;
const ButtonContainer = styled.div`
  height: 8rem;
  width: 100%;
  padding: 0 5%;
  display: flex;
  align-items: center;
  button {
    padding: 1rem 2rem;
    border: none;
    background: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 0.4rem;
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }
`;
const DetailsContainer = styled(motion.div)`
  height: 70vh;
  width: 100%;
  padding: 2rem 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const ImageContainer = styled.div`
  width: 40%;
  height: 25rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @media only screen and (max-width: 1024px) {
    width: 70%;
    height: 30rem;
  }
`;
const CountryDescription = styled.div`
  width: 60%;
  height: 25rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
  h1 {
    margin: 0 0 1rem 0;
  }
  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media only screen and (max-width: 1024px) {
      align-items: center;
      justify-content: center;
    }
  }
  ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    list-style-type: none;
    margin: 0.5rem 0;
    p {
      padding: 0.2rem 0;
      font-weight: 600;
    }
    li {
      padding: 0.2rem 1rem;
      margin: 0 0.2rem;
      border: 1px solid hsl(0, 0%, 52%);
      border-radius: 0.4rem;
    }
  }
`;

const Span = styled.span`
  font-weight: 600;
  margin: 0.2rem 0;
`;
