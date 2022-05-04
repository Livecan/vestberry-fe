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

const ExtraBold = styled.span`
  font-weight: 900;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const SemiBold = styled.span`
  font-weight: 500;
`;

const Normal = styled.span`
  font-weight: normal;
`;

const Button = styled.button`
  font-family: "Gotham Bold", sans-serif;
  font-weight: bold;
  font-size: 14px;
  height: 40px;
  padding-left: 35px;
  padding-right: 35px;
  cursor: pointer;
`;

const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.button.bg};
  color: ${(props) => props.theme.colors.text};
  border: 0;
  border-radius: 20px;
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.secondaryText};
`;

export {
  SectionHeading,
  Card,
  Th,
  TrHeader,
  Td,
  Tr,
  ExtraBold,
  Bold,
  SemiBold,
  Normal,
  PrimaryButton,
  SecondaryButton,
};
