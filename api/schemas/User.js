const { gql } = require('apollo-server');

export default gql `
    type User {
        id: ID!
        username: String!
    }

    type Token {
        token: String!
    }

    extend type Query {
        user(id: ID!): User!
        login(name: String!, password: String!): Token!
    }

    extend type Mutation {
        createUser(name: String!, password: String!): User!
    }
`;
