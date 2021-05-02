const { gql } = require("apollo-server");

const typeDefs = gql`
  type Launch {
    id: ID!
    mission_name: String
    launch_year: String
    launch_date_local: String
    launch_success: Boolean
    rocket: Rocket
  }

  type Rocket {
    id: ID!
    rocket_name: String
    rocket_type: String
  }

  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    rockets: [Rocket]!
    rocket(id: ID!): Rocket
  }
`;

module.exports = typeDefs;
