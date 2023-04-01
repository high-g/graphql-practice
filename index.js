const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

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
    users_fetch: [User]
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
    users_fetch: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      return response.data
    },
    user: async (parent, args) => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
      return response.data
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`)
})
