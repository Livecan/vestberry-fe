import { CompanyType } from "@client/graphql";
import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, SectionHeading } from "./StyledComponents";

const SectorCard = styled(Card)`
  &:hover {
    background-color: ${(props) => props.theme.card.hoverBg};
    cursor: pointer;
  }
  width: 235px;
  margin-right: 15px;
  height: 140px;
`;

const SectorCardContent = styled.div`
  position: absolute;
  left: 30px;
  top: 36px;
`;

const CompaniesTypeCount = styled.div`
  font-size: 38px;
`;

const CompanyTypeName = styled.div`
  color: ${(props) => props.theme.colors.secondaryText};
`;

const CompanyTypeImage = styled.img`
  position: absolute;
  left: 150px;
  top: 42px;
`;

const CompaniesBySectorWidget = ({
  companies,
}: {
  companies?: CompanyType[];
}) => {
  const companiesBySector = useMemo(() => {
    const companiesBySector = new Map<string, number>();
    if (companies != null) {
      for (const company of companies) {
        companiesBySector.set(
          company.sector,
          (companiesBySector.get(company.sector) ?? 0) + 1
        );
      }
    }
    return Array.from(companiesBySector);
  }, [companies]);

  return (
    <div>
      <SectionHeading>Companies by sectors</SectionHeading>
      <div style={{ display: "flex" }}>
        {companiesBySector?.map((sector) => (
          <SectorCard key={sector[0]}>
            <SectorCardContent>
              <CompaniesTypeCount>{sector[1]}</CompaniesTypeCount>
              <CompanyTypeName>{sector[0]}</CompanyTypeName>
            </SectorCardContent>
            <CompanyTypeImage src={`/${sector[0]}.svg`} alt={sector[0]} />
          </SectorCard>
        ))}
      </div>
    </div>
  );
};

export default CompaniesBySectorWidget;
