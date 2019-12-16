import React from "react";

import { Row, Col } from "reactstrap";
import Stat from "./stat";
import {
  weightedSensitivity,
  weightedSpecificy,
  weightedInformedness
} from "../../framework/rules_matrix";

const StatRow = ({ rulesMatrix }) => {
  return (
    <Row>
      <Col>
        <Stat
          statName="Weighted Sensitivity"
          value={weightedSensitivity(rulesMatrix) || 0.0}
        >
          Detected violations divided by both detected and undetected
          violations.
        </Stat>
      </Col>
      <Col>
        <Stat
          statName="Weighted Specificity"
          value={weightedSpecificy(rulesMatrix) || 0.0}
        >
          Detected non-violations divided by both detected and undetected
          non-violations.
        </Stat>
      </Col>
      <Col>
        <Stat
          statName="Weighted Informedness"
          value={weightedInformedness(rulesMatrix) || 0.0}
        >
          Combined score of both sensitivity and specificity, counts as your
          final score.
        </Stat>
      </Col>
    </Row>
  );
};

export default StatRow;
