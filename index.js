const { ApolloServer, gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')
const axios = require('axios')

class jsonPlaceAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://jsonplaceholder.typicode.com/'
  }

  async getUsers() {
    const data = await this.get('/users')
    return data
  }
  async getUser(id) {
    const data = await this.get(`/users/${id}`)
    return data
  }
  async getPost() {
    const data = await this.get('/posts')
    return data
  }
}

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
    hello: (_, args) => `Hello ${args.name}!`,
    users: () => users,
    users_fetch: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      return response.data
    },
    user: async (_, args, { dataSources }) => {
      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
      return userResponse.data
    },
    posts: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      return response.data
    },
  },
  User: {
    myPosts: async (parent) => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
      const myPosts = response.data.filter((post) => post.id === parent.id)
      return myPosts
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ jsonPlaceAPI: new jsonPlaceAPI() }),
})

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`)
})
