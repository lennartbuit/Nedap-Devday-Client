import React from "react";

import Shifts from "./shifts";

const Dataset = ({ shifts, clockings, results }) => {
  return (
    <React.Fragment>
      <h1 className="text-center my-3"> Shifts </h1>
      <Shifts shifts={shifts} />

      {/* <h1 className="text-center my-3"> Clockings </h1>
      <Clockings clockings={clockings} results={results} /> */}
    </React.Fragment>
  );
};

export default Dataset;
