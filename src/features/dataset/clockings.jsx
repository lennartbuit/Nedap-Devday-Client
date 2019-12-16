import React from "react";

import { Table } from "reactstrap";

import Time from "./time";

const Clocking = ({ id, time, status, location, customer, worker, rules }) => {
  let truncate = n => str =>
    str.length > n ? `${str.substring(0, n - 1)}…` : str;

  return (
    <tr>
      <th scope="row" title={id}><pre>{truncate(9)(id)}</pre></th>
      <td>{worker}</td>
      <td>{customer}</td>
      <td>{location}</td>
      <td>
        <Time seconds={time} />
      </td>
      <td>{status}</td>
      {rules && <td>{rules}</td>}
    </tr>
  );
};

const Clockings = ({ clockings, withRules }) => {
  let components = clockings.map(clocking => (
    <Clocking {...clocking} key={clocking.id} />
  ));

  return (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th>Clocking</th>
          <th>Person</th>
          <th>Customer</th>
          <th>Locations</th>
          <th>Start</th>
          <th>Status</th>
          {withRules && <th>Rules</th>}
        </tr>
      </thead>
      <tbody>{components}</tbody>
    </Table>
  );
};

export default Clockings;
