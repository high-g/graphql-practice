const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    h: String
    hello(name: String!): String
    users: [User]
    user(id: ID!): User
  }
`

const users = [
  { id: '1', name: 'John Doe', email: 'john@test.com' },
  { id: '2', name: 'Taro Suzuki', email: 'suzuki@example.com' },
]

const resolvers = {
  Query: {
    h: () => 'Hello World!',
    hello: (parent, args) => `Hello ${args.name}!`,
    users: () => users,
    user: (parent, args) => {
      const user = users.find((user) => user.id === args.id)
      return user
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`)
})
