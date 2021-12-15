import React from "react";
import styled from "styled-components";

const DetailsData = ({ name, data }) => {
  return (
    <p>
      <Span>{name}:</Span>
      {data}
    </p>
  );
};

export default DetailsData;

const Span = styled.span`
  font-weight: 600;
  margin: 0.2rem 0;
  text-decoration: underline;
`;
