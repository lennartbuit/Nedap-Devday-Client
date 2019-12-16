import React, { useState } from "react";
import { Form, FormGroup, Input, Button, Alert } from "reactstrap";
import { fromByteArray } from "base64-js";

export const generatePassword = () => {
  let vals = new Uint8Array(16);
  window.crypto.getRandomValues(vals);
  return fromByteArray(vals);
};

const TeamForm = ({ onSubmit, error }) => {
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = e => {
    setDisabled(true);
    e.preventDefault();
    onSubmit({ name, password: generatePassword() });
  };

  return (
    <>
      <h1> Create Team </h1>
      <p>
        Register your team in order to run your dector against the test set and
        submit your results. When you register a team name on one computer, you
        cannot register the same team on another.
      </p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          {error && (
            <Alert color="danger">
              {error.message.replace(/GraphQL error: /, "")}{" "}
            </Alert>
          )}
          <Input
            type="string"
            id="team"
            name="team"
            placeholder="Enter teamname"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
        </FormGroup>
        <Button color="primary" disabled={disabled}>
          Create
        </Button>
      </Form>
    </>
  );
};

export default TeamForm;
