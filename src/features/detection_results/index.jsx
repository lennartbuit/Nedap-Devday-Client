import React from "react";

import RulesGraph from "./rules_graph";
import { RulesMatrix } from "./rules_matrix";
import StatRow from "./stat_row";

const DetectionResults = ({ rulesMatrix }) => {

  return (
    <React.Fragment>
      <h1 className="text-center my-4"> Detection results </h1>
      <StatRow rulesMatrix={rulesMatrix} />

      <h1 className="text-center my-4"> Results per rule </h1>
      <RulesGraph rulesMatrix={rulesMatrix} />

      <h1 className="text-center my-4"> Confusion Matrix </h1>
      <RulesMatrix rulesMatrix={rulesMatrix} />
    </React.Fragment>
  );
};

export default DetectionResults;
