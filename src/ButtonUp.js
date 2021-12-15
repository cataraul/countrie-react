import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { motion } from "framer-motion";
const ButtonUp = () => {
  const darkTheme = useTheme();
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <Button
      className={darkTheme ? "dark-theme-class-lighter" : "light-theme-class"}
      style={{ display: visible ? "block" : "none" }}
      onClick={() => scrollToTop()}
    >
      <FontAwesomeIcon icon={faArrowCircleUp} />
    </Button>
  );
};

export default ButtonUp;

const Button = styled(motion.button)`
  position: fixed;
  height: 4rem;
  width: 4rem;
  font-size: 1.7rem;
  border: none;
  background: none;
  bottom: 1rem;
  right: 1rem;
  transition: transform 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
