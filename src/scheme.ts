/** @format */

import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    books(filter: BooksInput): [Book!]!
    book(id: Int!): Book
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addBook(input: AddBookInput!): Book!
    deleteBook(id: Int!): Book!
    updateBook(id: Int!, input: UpdateBookInput!): Book!
  }

  type Book {
    id: Int!
    title: String!
    author: String!
    createdAt: String!
    category: Category!
  }

  type Category {
    id: Int!
    name: String!
    books: [Book!]!
  }

  input BooksInput {
    isRead: Boolean
  }

  input AddBookInput {
    id: Int!
    title: String!
    author: String!
    createdAt: String!
    isRead: Boolean!
  }

  input UpdateBookInput {
    id: Int
    title: String
    author: String
    createdAt: String
    isRead: Boolean
  }
`
