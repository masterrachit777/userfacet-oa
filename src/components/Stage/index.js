import React from "react";
import styled from "styled-components";
import { Block } from "../Block";

export const Stage = ({ stage }) => {
  
    return (
    <StageWrapper width={stage[0].length} height={stage.length}>
      {stage.map((row) =>
        row.map((cell, index) => <Block key={index} char={cell[0]} type={cell[2]}/>)
      )}
    </StageWrapper>
  );
};

const StageWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    1fr
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  width: 100%;
  max-width: 80%;
  margin: auto;
  background: #0d252c;
  @media (max-width: 900px) {
    max-width: 100%;
  }
`;
