import React, { useState } from "react";
import { Form, Button, Alert } from "reactstrap";

const ResultForm = ({ onSubmit, error, team: { name } }) => {
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async e => {
    setDisabled(true);
    e.preventDefault();
    await onSubmit();
    setDisabled(false);
  };

  return (
    <>
      <h1>Team: {name}</h1>
      <p>
        You can run your detector against the test set and submit your results.
        Feel free to do this whenever you have an improvement, highest score
        counts!
      </p>
      <Form onSubmit={handleSubmit}>
        {error && (
          <Alert color="danger">
            {error.message.replace(/GraphQL error: /, "")}{" "}
          </Alert>
        )}
        <Button color="primary" type="submit" disabled={disabled}>
          Run and submit
        </Button>
      </Form>
    </>
  );
};

export default ResultForm;
