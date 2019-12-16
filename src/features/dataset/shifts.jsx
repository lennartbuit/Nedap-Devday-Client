import React from "react";

import { Table } from "reactstrap";

import Time from "./time";

const Shift = ({ shift_name, start_time, stop_time, customer, locations }) => {
  return (
    <tr>
      <th scope="row">{shift_name}</th>
      <td>{customer}</td>
      <td>{locations.join(", ")}</td>
      <td>
        <Time seconds={start_time} />
      </td>
      <td>
        <Time seconds={stop_time} />
      </td>
    </tr>
  );
};

const Shifts = ({ shifts }) => {
  let components = shifts.map(shift => (
    <Shift {...shift} key={shift.shift_name} />
  ));

  return (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th>Shift</th>
          <th>Customer</th>
          <th>Locations</th>
          <th>Start</th>
          <th>Stop</th>
        </tr>
      </thead>
      <tbody>{components}</tbody>
    </Table>
  );
};

export default Shifts;
