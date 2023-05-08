import { createServer } from 'http'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  const resolvers = {
    Query: {
      hello: () => `Hello World`,
    },
  }

  const apolloServer = new ApolloServer({ typeDefs, resolvers })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, path: '/api' })

  console.log('process.env.PORT', process.env.PORT)

  app.get('/', (req, res) => {
    res.send('Hello, World')
  })

  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
  )
}

startServer()
