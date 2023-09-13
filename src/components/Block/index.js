import React, {memo} from "react";
import styled from "styled-components";
import { WORDS } from "../../utils/words";

// preventing unnecessary component update via React.memo() in Pure Component
export const Block = memo(({ char, type }) => (
  <BlockWrapper type={type} color={WORDS[type].color}>
    <span>{char}</span>
  </BlockWrapper>
));

const BlockWrapper = styled.span`
  width: auto;
  min-height: calc(80% / 35);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => (props.type === 0 ? "0px solid" : "4px solid")};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
`;
