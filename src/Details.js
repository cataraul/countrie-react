import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import DetailsData from "./DetailsData";

const Details = () => {
  //getting params from url to display specific country
  const params = useParams().id.toLowerCase();
  const [countryData, setCountryData] = useState([]);
  const darkTheme = useTheme();
  const [isLoading, setLoading] = useState(true);

  //fething data from api
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
      countryData.length > 0 && (
        <DetailsSection
          key="details-section"
          exit={{ opacity: 0 }}
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
                <DetailsData
                  name="Native-name"
                  data={countryData[0].nativeName}
                />

                <DetailsData name="Population" data={populationNumber} />
                <DetailsData name="Region" data={countryData[0].region} />
                <DetailsData
                  name="Sub Region"
                  data={countryData[0].subregion}
                />
                <DetailsData name="Capital" data={countryData[0].capital} />

                <p>
                  <Span>Top Level Domain: </Span>
                  {countryData[0].topLevelDomain.map((domain) => {
                    return <span key={domain}>{domain}</span>;
                  })}
                </p>
                <p>
                  <Span>Currencies:</Span>
                  {countryData[0].currencies &&
                    countryData[0].currencies.map((currency) => {
                      return <span key={currency.name}>{currency.name}; </span>;
                    })}
                </p>
                <p>
                  <Span>Languages:</Span>
                  {countryData[0].languages.map((language) => {
                    return <span key={language.name}>{language.name} </span>;
                  })}
                </p>
              </div>
              <ul>
                <p>Border Countries:</p>
                {countryData[0].borders ? (
                  countryData[0].borders.map((border) => {
                    return <li key={border}>{border}</li>;
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
  }
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
    width: 50%;
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
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    margin: 0.5rem 0;
    p {
      padding: 0.25rem;
    }
    @media only screen and (max-width: 1024px) {
      align-items: center;
      justify-content: center;
    }
    @media only screen and (max-width: 530px) {
      grid-template-columns: 1fr;
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
      font-size: 1.3rem;
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
  text-decoration: underline;
`;
