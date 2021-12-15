import React from "react";
import styled from "styled-components";
import moon from "./assets/moon.png";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme, useThemeUpdate } from "./ThemeContext";

const Navbar = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <NavBar
      className={darkTheme ? "dark-theme-class-lighter" : "light-theme-class"}
    >
      <div>
        <h1>Where in the world?</h1>
        <button
          onClick={() => toggleTheme()}
          className={darkTheme ? "dark-theme-class" : "light-theme-class"}
        >
          <FontAwesomeIcon icon={faMoon} />
          Dark Mode
        </button>
      </div>
    </NavBar>
  );
};

export default Navbar;

const NavBar = styled.nav`
  position: relative;
  height: 5rem;
  width: 100%;
  box-shadow: 0px 12px 15px -15px hsl(0, 0%, 0%);
  z-index: 2;
  div {
    margin: 0 auto;
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      height: 4rem;
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      background: none;
      border: none;
      img {
        height: 1rem;
        margin: 0 0.2rem;
        width: 1rem;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
