import React from "react";

import { Jumbotron } from "reactstrap";
import TeamForm from "./team_form";
import TeamsGraph from "./teams_graph";
import { gql, useMutation, useQuery } from "@apollo/client";
import ResultForm from "./result_form";

import { runDetector } from "../../framework/detector";
import * as detector from "./../../detector";
import shifts from "../../data/test/shifts";
import traces from "../../data/test/traces";

const TEAMS_FRAGMENT = gql`
  fragment TeamFragment on Team {
    id
    label: name
    result: bestResult {
      id
      sensitivity
      specificity
      informedness
    }
  }
`;

const MY_TEAM = gql`
  query {
    myTeam @client {
      id
      password
      name
    }
  }
`;

const TEAMS_QUERY = gql`
  query {
    teams {
      ...TeamFragment
    }
  }
  ${TEAMS_FRAGMENT}
`;

const CREATE_MY_TEAM = gql`
  mutation CreateMyTeam($myTeam: MyTeamInput!) {
    createMyTeam(input: { myTeam: $myTeam }) @client {
      myTeam {
        ...TeamFragment
      }
    }
  }
  ${TEAMS_FRAGMENT}
`;

const updateMyTeam = (
  cache,
  {
    data: {
      createMyTeam: { myTeam }
    }
  }
) => {
  cache.writeQuery({
    query: MY_TEAM,
    data: { myTeam }
  });
};

const CREATE_TEAM = gql`
  mutation CreateTeam($team: TeamInput!) {
    createTeam(input: { team: $team }) {
      team {
        ...TeamFragment
      }
    }
  }
  ${TEAMS_FRAGMENT}
`;

const updateCreateTeam = (
  cache,
  {
    data: {
      createTeam: { team }
    }
  }
) => {
  const { teams } = cache.readQuery({ query: TEAMS_QUERY });
  cache.writeQuery({
    query: TEAMS_QUERY,
    data: { teams: [...teams, team] }
  });
};

const CREATE_RESULT = gql`
  mutation CreateResult($team: TeamInput!, $predictions: [PredictionInput!]!) {
    createResult(input: { team: $team, predictions: $predictions }) {
      team {
        ...TeamFragment
      }
    }
  }
  ${TEAMS_FRAGMENT}
`;

const updateCreateResult = (
  cache,
  {
    data: {
      createResult: {
        team: { id, ...newTeam }
      }
    }
  }
) => {
  cache.writeFragment({
    fragment: TEAMS_FRAGMENT,
    id: `Team:${id}`,
    data: newTeam
  });
};

const Compete = () => {
  const { data: { myTeam: team } = {}, loading: myTeamLoading } = useQuery(
    MY_TEAM
  );

  const { data, loading: teamsLoading, error } = useQuery(TEAMS_QUERY, {
    pollInterval: 5000
  });

  const [doCreateMyTeam] = useMutation(CREATE_MY_TEAM, {
    update: updateMyTeam
  });

  const [doCreateTeam, { error: creationError }] = useMutation(CREATE_TEAM, {
    onError: () => {},
    update: updateCreateTeam
  });

  const [doCreateResult, { error: resultError }] = useMutation(CREATE_RESULT, {
    onError: () => {},
    update: updateCreateResult
  });

  const createTeam = async team => {
    const { password } = team;
    const {
      data: {
        createTeam: {
          team: { id }
        }
      }
    } = await doCreateTeam({
      variables: { team }
    });
    await doCreateMyTeam({ variables: { myTeam: { id, password } } });
  };

  const createResult = async () => {
    const predictions = Object.entries(
      runDetector(detector, shifts, traces)
    ).map(([trace, rule]) => ({
      trace,
      rule
    }));

    await doCreateResult({
      variables: {
        team: { name: team.name, password: team.password },
        predictions
      }
    });
  };

  const results = teamsLoading || myTeamLoading || error ? [] : data.teams;

  return teamsLoading || myTeamLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <Jumbotron>
        {team ? (
          <ResultForm team={team} onSubmit={createResult} error={resultError} />
        ) : (
          <TeamForm onSubmit={createTeam} error={creationError} />
        )}
      </Jumbotron>

      <h1 className="text-center my-4"> Best Scores per Team </h1>
      <TeamsGraph results={results} />
    </>
  );
};

export default Compete;
