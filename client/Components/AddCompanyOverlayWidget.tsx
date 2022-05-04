import ModalUnstyled from "@mui/base/ModalUnstyled";
import React, { Props, ReactChild, ReactChildren, useState } from "react";
import clsx from "clsx";
import styled, { css } from "styled-components";
import {
  ExtraBold,
  Normal,
  PrimaryButton,
  SecondaryButton,
  SemiBold,
} from "./StyledComponents";
import { validate } from "graphql";

// BackdropUnstyled, Modal & Backdrop styles from https://mui.com/base/react-modal/
const BackdropUnstyled = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(14, 15, 17, 0.9);
  -webkit-tap-highlight-color: transparent;
`;

const AddCompanyDiv = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.bg};
  height: 630px;
  width: 640px;
  border-radius: 20px;
`;

const FormHeader = styled.div`
  background-color: rgba(256, 256, 256, 0.03);
  height: 125px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 40px;
`;

const FormHeaderTitle = styled(ExtraBold)`
  display: block;
  font-size: 22px;
`;

const FormHeaderDescription = styled(Normal)`
  display: block;
  width: 492px;
  color: ${(props) => props.theme.colors.secondaryText};
  margin-top: 5px;
  font-size: 13px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

// @todo Load these via graphQL
const sectors = ["Fintech", "IOT", "Roboadvisory", "Insuretech"];
const stages = [
  "Idea",
  "Prototype",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
];

const InputCss = css`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.secondaryText};
  border-radius: 4px;
  width: 560px;
  height: 42px;
  font-size: 15px;
  padding-left: 15px;
  margin-top: 5px;
  outline: none;
`;

const InputText = styled.input`
  ${InputCss}
`;

const InputSelect = styled.select`
  ${InputCss}
  color: ${(props) =>
    props.value != ""
      ? props.theme.colors.text
      : props.theme.colors.secondaryText};
`;

const InputSelectOption = styled.option`
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
`;

const InputWrapper = styled.div`
  ${InputCss}
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const InputLabel = styled(SemiBold)`
  display: block;
  font-size: 13px;
`;

const TextField = (props: { label: string; children: ReactChild }) => (
  <div style={{ marginLeft: "40px", marginTop: "20px" }}>
    <InputLabel>{props.label}</InputLabel>
    {props.children}
  </div>
);

const AddCompanyOverlayWidget = (props: {
  open: boolean;
  onClose: () => void;
  onSave: (company: {
    name: string;
    stage: string;
    sector: string;
    investmentSize: number;
  }) => boolean;
}) => {
  const [name, setName] = useState("");
  const [stage, setStage] = useState("");
  const [sector, setSector] = useState("");
  const [investment, setInvestment] = useState(0);

  console.log(props.open);
  return (
    <Modal open={props.open} BackdropComponent={Backdrop}>
      <AddCompanyDiv>
        <FormHeader>
          <FormHeaderTitle>Add new company</FormHeaderTitle>
          <FormHeaderDescription>
            Add new company by filling all the required fields, select from
            lists and be careful, because integer is limited and not everyone
            can handle that
          </FormHeaderDescription>
        </FormHeader>
        <TextField label="Company name">
          <InputText
            type="text"
            placeholder="Company name"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </TextField>
        <TextField label="Stage">
          <InputSelect value={stage} onChange={(e) => setStage(e.target.value)}>
            <option value="" hidden>
              Select stage from list
            </option>
            {stages.map((stage) => (
              <InputSelectOption key={stage} value={stage}>
                {stage}
              </InputSelectOption>
            ))}
          </InputSelect>
        </TextField>
        <TextField label="Sector">
          <InputSelect
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="" hidden>
              Select sector from list
            </option>
            {sectors.map((sector) => (
              <InputSelectOption key={sector} value={sector}>
                {sector}
              </InputSelectOption>
            ))}
          </InputSelect>
        </TextField>
        <TextField label="Investment size">
          <InputWrapper>
            <input
              value={investment}
              onInput={(e) =>
                /^\d+$/.test(e.currentTarget.value) &&
                setInvestment(parseInt(e.currentTarget.value))
              }
              type="text"
              style={{
                backgroundColor: "transparent",
                border: 0,
                flexGrow: 2,
                outline: "none",
                textAlign: "right",
                marginRight: "15px",
              }}
            />
            <Normal>EUR</Normal>
          </InputWrapper>
        </TextField>
        <div style={{ position: "absolute", bottom: "40px", right: "40px" }}>
          <SecondaryButton onClick={props.onClose}>Cancel</SecondaryButton>
          <PrimaryButton
            onClick={() =>
              props.onSave({
                name: name,
                stage: stage,
                sector: sector,
                investmentSize: investment,
              }) && props.onClose()
            }
          >
            Add company
          </PrimaryButton>
        </div>
        <CloseButton onClick={props.onClose}>
          <img src="/Close.svg" alt="Close" />
        </CloseButton>
      </AddCompanyDiv>
    </Modal>
  );
};

export default AddCompanyOverlayWidget;
