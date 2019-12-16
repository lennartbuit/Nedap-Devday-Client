import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const axioms = [
  "Workers clock in and out manually, this is not derived automatically.",
  "When clocking in, you are 'clocked in' and vice versa.",
  "Workers switch locations by “clocking in” the new location",
  "A shift starts with clocking in, followed by potential location switches and ends by clocking out.",
  "Shifts have a walk in / walk out time of 10 minutes. This means that for a shift from 08:00 to 10:00, workers have to clock in between 07:50:00 and 07:59:59 (inclusive) and 10:00:01 and 10:10:00 (inclusive).",
  "Workers receive a 15 minute break every two working hours that they have been clocked in."
];

const rules = [
  "You have to be clocked in to clock out",
  "At the end of the day, you have to be clocked out.",
  "Workers have to clock out on the location that they have last clocked in.",
  "Workers cannot switch to the same location.",
  "Workers work at least 4 hours during a day. Breaks are subtracted from this total.",
  "Workers work at most 10 hours during a day. Breaks are subtracted from this total.",
  "Workers work zero or more shifts a day.",
  "Workers can only work multiple shifts of the same customer.",
  "During a shift, workers are allowed to switch locations, but only to locations that are part of that shift."
];

const introText = () => {
  return (
    <>
      <p>
        At staffing solutions we register thousands of hours each day, but not
        all is always well.
      </p>
      <p>
        Misregistered hours are costly, but not only that, also very frustrating
        to employees. Therefore, in this case, you explore a dataset of
        clockings and find all that are abnormal. The more you find, the least
        disappointed our customers and moreover their employees will be.
      </p>
      <p>
        To determine which registered clockings are correct and which are not
        use the following axioms and rules. A particular trace can (at most)
        violate a single rule and violations are checked in order.
      </p>
    </>
  );
};

const Documentation = () => {
  return (
    <div>
      <h1> Anomaly detection at Staffing Solutions </h1>
      {introText()}
      <h1>Axioms</h1>
      <p>The following statements are given, all clockings adhere to this:</p>
      {renderListOfItems(axioms)}
      <h1 className="mt-3">Rules</h1>
      <p>The following statements can be violated by clockings:</p>
      {renderListOfItems(rules)}
    </div>
  );
};

const renderItem = (item, key) => {
  return (
    <ListGroupItem key={item}>
      <span style={{ fontWeight: "bold" }}>{key}.</span> {item}
    </ListGroupItem>
  );
};

const renderListOfItems = list => {
  return (
    <ListGroup> {list.map((item, i) => renderItem(item, ++i))} </ListGroup>
  );
};

export default Documentation;
