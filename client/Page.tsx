import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_COMPANIES, ADD_COMPANY, CompanyType } from "@client/graphql";
import CompaniesBySectorWidget from "./Components/CompaniesBySectorWidget";
import CompaniesOverviewWidget from "./Components/CompaniesOverviewWidget";
import CompaniesByInvestmentSize from "./Components/CompaniesByInvestmentSize";
import { PrimaryButton } from "./Components/StyledComponents";
import AddCompanyOverlayWidget from "./Components/AddCompanyOverlayWidget";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

const AddCompanyButton = styled(PrimaryButton)`
  margin: 40px;
  width: 216px;
`;

export function Page() {
  const [openAddCompany, setOpenAddCompany] = useState<false | number>(false);

  const { loading, error, data } = useQuery<{ companies: CompanyType[] }>(
    GET_COMPANIES
  );

  const [addCompany] = useMutation<CompanyType>(ADD_COMPANY, {
    refetchQueries: [GET_COMPANIES],
  });

  const saveCompany = (company: {
    name: string;
    stage: string;
    sector: string;
    investmentSize: number;
  }) => {
    if (
      company.name.length == 0 ||
      company.stage.length == 0 ||
      company.sector.length == 0
    ) {
      return false;
    } else {
      addCompany({ variables: company });
      return true;
    }
  };

  if (loading) {
    return <CenteredDiv>Loading data...</CenteredDiv>;
  }

  if (error) {
    return (
      <span>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </span>
    );
  }

  return (
    <Container>
      <CompaniesBySectorWidget companies={data?.companies} />
      <CompaniesByInvestmentSize companies={data?.companies} />
      <CompaniesOverviewWidget companies={data?.companies} />
      <CenteredDiv>
        <AddCompanyButton onClick={() => setOpenAddCompany(Math.random())}>
          Add new company
        </AddCompanyButton>
      </CenteredDiv>
      <AddCompanyOverlayWidget
        key={openAddCompany ? openAddCompany : 0}
        open={!!openAddCompany}
        onClose={() => setOpenAddCompany(false)}
        onSave={saveCompany}
      />
    </Container>
  );
}

export default Page;
