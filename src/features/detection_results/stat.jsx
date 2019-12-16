import React from "react";

import { Card, CardTitle, CardBody, CardHeader, CardText } from "reactstrap";

const statClass = value => {
  if (value < 0.33) {
    return "text-danger";
  } else if (value < 0.66) {
    return "text-warning";
  } else {
    return "text-success";
  }
};

const Stat = ({ statName, value, children }) => (
  <Card className="text-center">
    <CardHeader>{statName}</CardHeader>
    <CardBody>
      <CardTitle tag="h1" className={statClass(value) + " my-4"}>
        {value.toFixed(2)}
      </CardTitle>
      <CardText>{children}</CardText>
    </CardBody>
  </Card>
);

export default Stat;
