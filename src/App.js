import React from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  gql
} from "@apollo/client";

import { Container, Nav, NavItem, NavLink } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  NavLink as RouterNavLink
} from "react-router-dom";

import DetectionResults from "./features/detection_results";
import Dataset from "./features/dataset";
import Documentation from "./features/documentation";
import Compete from "./features/compete";

import shifts from "./data/train/shifts";
import traces from "./data/train/traces";
import actual from "./data/train/actual";

import { runDetector } from "./framework/detector";
import { rulesMatrix } from "./framework/rules_matrix";
import * as detector from "./detector";

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject(object) {
      return `${object.__typename}:${object.id}`;
    }
  }),
  link: new HttpLink({
    uri: "https://nedap-devday.herokuapp.com/graphql"
  }),
  resolvers: {
    Query: {
      myTeam: (_root, _variables, _ctx) => {
        const result = JSON.parse(window.localStorage.getItem("myTeam"));
        return result && { __typename: "Team", ...result };
      }
    },
    Mutation: {
      createMyTeam: (_root, { input: { myTeam }}, _ctx) => {
        window.localStorage.setItem("myTeam", JSON.stringify(myTeam));
        return { myTeam: { __typename: "Team", ...myTeam } };
      }
    }
  },
  typeDefs: gql`
    input MyTeamInput {
      id: ID!
      password: String!
    }

    input CreateMyTeamInput {
      myTeam: MyTeamInput!
    }

    type CreateMyTeamPayload {
      myTeam: Team!
    }

    extend type Team {
      password: String
    }

    extend type Mutation {
      createMyTeam(input: CreateMyTeamInput!): CreateMyTeamPayload!
    }

    extend type Query {
      myTeam: Team!
    }
  `
});

const App = () => {
  const matrix = rulesMatrix(actual, runDetector(detector, shifts, traces));

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Container>
            <Nav tabs className="my-3">
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  activeClassName="active"
                  exact
                >
                  Detection results
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/data/"
                  activeClassName="active"
                  exact
                >
                  Dataset
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/documentation/"
                  activeClassName="active"
                  exact
                >
                  Documentation
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/compete/"
                  activeClassName="active"
                  exact
                >
                  Compete
                </NavLink>
              </NavItem>
            </Nav>

            <Route
              path="/"
              exact
              render={() => <DetectionResults rulesMatrix={matrix} />}
            />
            <Route
              path="/data/"
              exact
              render={() => <Dataset shifts={shifts} />}
            />
            <Route
              path="/documentation/"
              exact
              render={() => <Documentation />}
            />
            <Route path="/compete/" exact render={() => <Compete />} />
          </Container>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
