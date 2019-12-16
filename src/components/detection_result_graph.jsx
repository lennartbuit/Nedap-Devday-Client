import React from "react";

import { Row, Col } from "reactstrap";
import {
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalBarSeries
} from "react-vis";

const DetectionResultGraph = ({ results }) => {
  const { sensitivityData, specificityData, informednessData } = results.reduce(
    (
      { sensitivityData, specificityData, informednessData },
      { label, result }
    ) => {
      const { sensitivity, specificity, informedness } = result || {};

      return {
        sensitivityData: [
          ...sensitivityData,
          { x: label, y: sensitivity || 0.0 }
        ],
        specificityData: [
          ...specificityData,
          { x: label, y: specificity || 0.0 }
        ],
        informednessData: [
          ...informednessData,
          { x: label, y: Math.max(0.0, informedness) || 0.0 }
        ]
      };
    },
    { sensitivityData: [], specificityData: [], informednessData: [] }
  );

  const legend = ["sensitivity", "specificity", "informedness"];

  return (
    <Row>
      <Col xs={10}>
        <FlexibleWidthXYPlot
          xType="ordinal"
          height={300}
          xDistance={100}
          yDomain={[0, 1]}
          margin={{bottom: 100}}
        >
          <HorizontalGridLines />
          <VerticalBarSeries data={sensitivityData} />
          <VerticalBarSeries data={specificityData} />
          <VerticalBarSeries data={informednessData} />
          <XAxis tickLabelAngle={-45} />
          <YAxis />
        </FlexibleWidthXYPlot>
      </Col>
      <Col xs={2}>
        <DiscreteColorLegend height={200} width={300} items={legend} />
      </Col>
    </Row>
  );
};

export default DetectionResultGraph;
