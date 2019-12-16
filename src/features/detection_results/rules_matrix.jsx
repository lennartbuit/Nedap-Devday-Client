import React from "react";

import { Row, Col } from "reactstrap";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  LabelSeries,
  ChartLabel
} from "react-vis";
import { range } from "../../framework/utils";
import { RULES } from "../../framework/constants";

const DANGER = "#f8d7da";
const SUCCESS = "#d4edda";

export const RulesMatrix = ({ rulesMatrix }) => {
  const getLabel = i => (i ? `Rule ${i}` : "none");

  const data = rulesMatrix.flatMap((row, y) =>
    row.map((ids, x) => ({ x: getLabel(x), y: getLabel(y), ids }))
  );

  return (
    <Row>
      <Col xs={12}>
        <FlexibleWidthXYPlot
          xType="ordinal"
          xDomain={[...range(0, RULES + 1)].map(getLabel)}
          yType="ordinal"
          yDomain={[...range(0, RULES + 1)].map(getLabel)}
          height={500}
        >
          <HeatmapSeries
            colorType="literal"
            getColor={({ x, y }) => (x === y ? SUCCESS : DANGER)}
            style={{
              stroke: "white",
              strokeWidth: "2px",
              rectStyle: {
                rx: 10,
                ry: 10
              }
            }}
            data={data}
          />
          <LabelSeries
            labelAnchorX="middle"
            labelAnchorY="middle"
            getLabel={({ ids }) => `${ids.size}`}
            data={data}
          />
          <XAxis />
          <YAxis tickLabelAngle={-45} />
          <ChartLabel
            text="actual violated rule"
            includeMargin={false}
            xPercent={0.5}
            yPercent={1.03}
            style={{
              textAnchor: "middle"
            }}
          />
          <ChartLabel
            text="predicted violated rule"
            includeMargin={false}
            xPercent={0.002}
            yPercent={0.52}
            style={{
              transform: "rotate(-90)",
              textAnchor: "middle"
            }}
          />
        </FlexibleWidthXYPlot>
      </Col>
    </Row>
  );
};
