import React from "react";

import {
  sensitivity,
  specificity,
  informedness
} from "../../framework/binary_matrix";
import { binaryMatrix } from "../../framework/rules_matrix";
import { ALL_RULES } from "../../framework/constants";
import DetectionResultGraph from "../../components/detection_result_graph";

const RulesGraph = ({ rulesMatrix }) => {
  const results = [...ALL_RULES].map(rule => {
    const matrix = binaryMatrix(rulesMatrix, rule);

    return {
      label: `Rule ${rule}`,
      result: {
        sensitivity: sensitivity(matrix),
        specificity: specificity(matrix),
        informedness: informedness(matrix),
      }
    };
  });

  return (
    <DetectionResultGraph results={results} />
  );
};

export default RulesGraph;
