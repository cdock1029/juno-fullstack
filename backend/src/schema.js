import { getUser } from './datastore'

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.id
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.name
    },
    age: {
      type: GraphQLInt,
      resolve: user => user.age
    },
  },
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'query for things',
  fields: {
    user: {
      type: userType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve: (_, { userId }) => getUser(userId),
    },
  },
})

const schema = new GraphQLSchema({
  query: queryType,
})

module.exports = schema
