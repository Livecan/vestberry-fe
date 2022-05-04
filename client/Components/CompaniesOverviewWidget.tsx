import { CompanyType } from "@client/graphql";
import {
  Normal,
  SectionHeading,
  Td,
  Th,
  Tr,
  TrHeader,
} from "./StyledComponents";

const numberFormat = new Intl.NumberFormat("sk-SK", { useGrouping: true });

const CompaniesOverviewWidget = ({
  companies,
}: {
  companies?: CompanyType[];
}) => {
  return (
    <div>
      <SectionHeading>Companies overview</SectionHeading>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderSpacing: "30px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <TrHeader>
            <Th>
              <Normal>Company name</Normal>
            </Th>
            <Th>
              <Normal>stage</Normal>
            </Th>
            <Th>
              <Normal>sector</Normal>
            </Th>
            <Th>
              <Normal>investment size</Normal>
            </Th>
          </TrHeader>
        </thead>
        <tbody>
          {companies?.map((company) => (
            <Tr key={company.id}>
              <Td>{company.name}</Td>
              <Td>{company.stage}</Td>
              <Td>{company.sector}</Td>
              <Td>{numberFormat.format(company.investmentSize)} EUR</Td>
            </Tr>
          )) ?? null}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesOverviewWidget;
