import React from "react";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme, useCountriesData } from "./ThemeContext";

const SearchParams = ({ countriesCoppy, setCountriesCoppy }) => {
  //Getting the theme from the context
  const darkTheme = useTheme();
  const { countries } = useCountriesData();

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
      setCountriesCoppy(
        countries.filter((country) => country.region === e.target.value)
      );
    }
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
      <select
        onChange={(e) => handleChange(e)}
        id="select-region"
        className={darkTheme ? "dark-theme-class-lighter" : "light-theme-class"}
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
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
    
    }

    select{
      width:12rem;
      height:3rem;
      border:none;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      font-size:1rem;
      &:hover{
        cursor:pointer;
      }
      option{
       
        
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
