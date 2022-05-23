import React from "react";
import styled from "styled-components";
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme, useCountriesData } from "./ThemeContext";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SearchParams = ({ countriesCoppy, setCountriesCoppy }) => {
  //Getting the theme from the context
  const darkTheme = useTheme();
  const { countries } = useCountriesData();
  const [populationNumber, setPopulationNumber] = useState(0);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  useEffect(() => {
    if (countriesCoppy.length === 0) {
      setCountriesCoppy([...countries]);
    }
  }, [selectedCountries, selectedRegions, countriesCoppy]);

  //Function handler for filtering out arrays when user searchs for a particular country
  const filterCountriesHandler = (e) => {
    e.preventDefault();
    if (!e.target.value) {
      setCountriesCoppy([...countries]);
    } else {
      setCountriesCoppy(
        countries.filter((country) =>
          country.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };
  //Select Region and display countries from that region
  const handleChange = (e) => {
    if (!e.target.value) {
      setCountriesCoppy([...countries]);
    } else {
      fetchData(e.target.value);
    }
  };

  //Filter by population number
  const populationFilter = (e) => {
    setCountriesCoppy(
      countries.filter((country) => country.population < e.target.value)
    );
    let population = e.target.value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPopulationNumber(population);
  };

  const fetchData = async (region) => {
    if (selectedRegions.includes(region)) {
      return false;
    } else {
      let response = await fetch(
        `https://restcountries.com/v2/region/${region}`
      );
      let data = await response.json();
      setCountriesCoppy(() => [...selectedCountries, ...data]);
      setSelectedCountries(() => [...selectedCountries, ...data]);
      setSelectedRegions(() => [...selectedRegions, region]);
    }
  };

  const deleteFilter = (e) => {
    setCountriesCoppy(
      countriesCoppy.filter(
        (country) => country.region !== e.target.textContent
      )
    );
    setSelectedRegions(
      selectedRegions.filter((region) => region !== e.target.textContent)
    );
  };

  return (
    <InputContainer
      className={darkTheme ? "dark-theme-class" : "light-theme-class"}
    >
      <InputDiv
        className={darkTheme ? "dark-theme-class-lighter" : "light-theme-class"}
      >
        <FontAwesomeIcon
          icon={faSearch}
          className={`search-icon ${
            darkTheme ? "dark-theme-class-lighter" : "light-theme-class"
          }`}
        />
        <input
          type="text"
          onChange={(e) => filterCountriesHandler(e)}
          placeholder="Search for a country..."
          className={
            darkTheme ? "dark-theme-class-lighter" : "light-theme-class"
          }
        />
      </InputDiv>
      <div onClick={(e) => deleteFilter(e)}>
        {selectedRegions.length > 0
          ? selectedRegions.map((region) => {
              return (
                <SelectedRegionButton
                  key={uuidv4()}
                  className={
                    darkTheme ? "dark-theme-class-lighter" : "light-theme-class"
                  }
                >
                  <FontAwesomeIcon
                    icon={faWindowClose}
                    className={`close-icon ${
                      darkTheme
                        ? "dark-theme-class-lighter"
                        : "light-theme-class"
                    }`}
                  />
                  {region}
                </SelectedRegionButton>
              );
            })
          : ""}
      </div>
      <FilterContainer>
        <div>
          <p>Filter by population number:</p>
          <input
            type="range"
            name="population"
            id="population-range"
            min="500"
            max="1402112000"
            onMouseUp={(e) => populationFilter(e)}
          />
          <p>{populationNumber}</p>
        </div>

        <p></p>
        <select
          onChange={(e) => {
            handleChange(e);
            setSelectedCountries([...selectedCountries, e.target.value]);
          }}
          id="select-region"
          className={
            darkTheme ? "dark-theme-class-lighter" : "light-theme-class"
          }
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </FilterContainer>
    </InputContainer>
  );
};

export default SearchParams;

const InputContainer = styled.div`
    position:relative;
    width:100%:
    height:15rem;
    padding:2rem 5%;
    color: hsl(0, 0%, 52%);
    display:flex;
    align-items:center;
    justify-content:space-between;
    select{
      width:12rem;
      height:3rem;
      border:none;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      font-size:1rem;
      &:hover{
        cursor:pointer;
      }
    }
    @media only screen and (max-width:680px){
      flex-direction:column;
      gap:2rem;
    }
`;
const InputDiv = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  width: 26rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 0.4rem;
  @media only screen and (max-width: 430px) {
    width: 20rem;
    input {
      width: 12rem;
    }
  }
  @media only screen and (max-width: 330px) {
    width: 16rem;
    input {
      width: 9rem;
    }
  }
  input {
    height: 3rem;
    width: 18rem;
    border: none;
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    padding-left: 1rem;

    &:focus {
      outline: none;
    }
  }
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  div {
    padding: 0 2rem;
    input {
      width: 18rem;
    }
  }
`;

const SelectedRegionButton = styled.button`
  padding: 0.2rem 1rem;
  margin: 0 0.2rem;
  border: 1px solid hsl(0, 0%, 52%);
  border-radius: 0.4rem;
  &:hover {
    cursor: pointer;
  }
`;
