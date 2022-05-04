import styled, { css } from "styled-components";

const SectionHeading = styled.h2`
  font-size: 28px;
`;

const Card = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.card.bg};
  border-radius: 10px;
  overflow: auto;
`;

const ThTd = css`
  text-align: right;
  padding: 30px;
  border: 0px;
  &:first-child {
    text-align: left;
  }
`;

const Th = styled.th`
  font-size: 10px;
  ${ThTd}
`;

const Td = styled.td`
  font-size: 14px;
  ${ThTd}
`;

const Tr = styled.tr`
  height: 60px;
  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

const TrHeader = styled.tr`
  height: 60px;
  background-color: rgba(255, 255, 255, 0.05);
`;

export { SectionHeading, Card, Th, TrHeader, Td, Tr };
