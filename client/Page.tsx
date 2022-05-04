import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_COMPANIES, CompanyType } from "@client/graphql";
import CompaniesBySectorWidget from "./Components/CompaniesBySectorWidget";
import CompaniesOverviewWidget from "./Components/CompaniesOverviewWidget";
import CompaniesByInvestmentSize from "./Components/CompaniesByInvestmentSize";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const LoadingDiv = styled.div`
  text-align: center;
`;

export function Page() {
  const { loading, error, data } = useQuery<{ companies: CompanyType[] }>(
    GET_COMPANIES
  );

  if (loading) {
    return <LoadingDiv>Loading data...</LoadingDiv>;
  }

  if (error) {
    return (
      <span>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </span>
    );
  }

  const companies = data?.companies;

  return (
    <Container>
      <CompaniesBySectorWidget companies={companies} />
      <CompaniesByInvestmentSize companies={companies} />
      <CompaniesOverviewWidget companies={companies} />
    </Container>
  );
}

export default Page;
