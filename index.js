const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    myPosts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    userId: ID!
  }

  type Query {
    h: String
    hello(name: String!): String
    users: [User]
    users_fetch: [User]
    user(id: ID!): User
    posts: [Post]
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
      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
      const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`)

      const myPosts = postsResponse.data.filter((post) => post.userId == args.id)
      const user = Object.assign({}, userResponse.data, {
        myPosts,
      })
      return user
    },
    posts: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      return response.data
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`)
})
