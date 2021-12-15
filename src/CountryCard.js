import React from "react";
import styled from "styled-components";
import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  //Formating numbers from 1000000 to 1,000,000
  let populationNumber = country.population
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let id = country.name;
  const darkTheme = useTheme();

  return (
    <Link to={`/details/${id}`} style={{ textDecoration: "none" }}>
      <CountryCardContainer
        className={darkTheme ? "dark-theme-class-lighter" : "light-theme-class"}
      >
        <CardImageContainer
          style={{ backgroundImage: `url(${country.flags.svg})` }}
        ></CardImageContainer>
        <CountryDescription>
          <h2>{country.name}</h2>
          <p>
            <span>Population:</span>
            {populationNumber}
          </p>
          <p>
            <span>Region:</span>
            {country.region}
          </p>
          <p>
            <span>Capital:</span>
            {country.capital}
          </p>
        </CountryDescription>
      </CountryCardContainer>
    </Link>
  );
};

export default CountryCard;

const CountryCardContainer = styled.div`
  height: 25rem;
  width: 20rem;
  border-radius: 0.2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media only screen and (max-width: 330px) {
    width: 16rem;
    height: 23rem;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
const CardImageContainer = styled.div`
  width: 100%;
  height: 12rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

const CountryDescription = styled.div`
  height: 13rem;
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  h2 {
    margin-bottom: 1rem;
  }
  span {
    letter-spacing: 0.1rem;
    font-weight: 600;
  }
`;
