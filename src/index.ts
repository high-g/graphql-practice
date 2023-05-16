/** @format */

import { createServer } from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { PrismaClient, Prisma } from '@prisma/client'
import { typeDefs } from './scheme'
import { Query } from './resolvers'

export type Context = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation>
}

const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  const prisma = new PrismaClient()

  const resolvers = {
    Query,
    // context: {
    //   prisma,
    // },
  }

  const apolloServer = new ApolloServer({ typeDefs, resolvers })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, path: '/api' })

  app.get('/', (req, res) => {
    res.send('Hello, World')
  })

  const port = process.env.PORT || 4000
  console.log('port', port)

  httpServer.listen({ port }, () => console.log(`Server listening on port ${port}`))
}

startServer()
