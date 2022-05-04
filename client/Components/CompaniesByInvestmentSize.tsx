import { CompanyType } from "@client/graphql";
import { ThemeConsumer } from "styled-components";
import { Card, SectionHeading } from "./StyledComponents";
import { Legend, Series, Size } from "devextreme-react/chart";
import { PieChart } from "devextreme-react";

const CenterComponent = ({ companiesCount }: { companiesCount: number }) => (
  <ThemeConsumer>
    {(theme) => (
      <g
        height={50}
        width={50}
        textAnchor="middle"
        transform="translate(0, -50)"
      >
        <text y="-20" fontSize={38} fill={theme.colors.text}>
          {companiesCount}
        </text>
        <text y="0">Companies</text>
      </g>
    )}
  </ThemeConsumer>
);

const CompaniesByInvestmentSize = ({
  companies,
}: {
  companies?: CompanyType[];
}) => (
  <div>
    <SectionHeading>Companies by investment size</SectionHeading>
    <Card
      style={{
        overflowY: "hidden",
        height: "355px",
        verticalAlign: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <PieChart
        type="doughnut"
        dataSource={companies}
        style={{ width: "100%" }}
        innerRadius={0.65}
        centerComponent={() => (
          <CenterComponent companiesCount={companies?.length ?? 0} />
        )}
      >
        <Size height={200} />
        <Series argumentField="name" valueField="investmentSize" />
        <Legend
          horizontalAlignment="right"
          verticalAlignment="top"
          margin={{ top: 50, right: 200 }}
          rowCount={7}
          /*markerComponent={(props) => {return (<circle r={6} fill={props.data.marker.fill} />)}}*/
        />
      </PieChart>
    </Card>
  </div>
);

export default CompaniesByInvestmentSize;
