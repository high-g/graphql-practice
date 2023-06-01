/** @format */

import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    books(isRead: Boolean!): [Book!]!
    book(id: Int!): Book
    categories: [Category!]!
    category(id: Int!): Category
  }

  type Mutation {
    addBook(input: AddBookInput!): BookPayload!
    deleteBook(id: Int!): Boolean!
    updateBook(id: Int!, input: UpdateBookInput!): Book!
  }

  type Book {
    id: Int!
    title: String!
    author: String!
    createdAt: String!
    category: Category!
    isRead: Boolean!
  }

  type Category {
    id: String!
    name: String!
    books: [Book!]!
  }

  type Error {
    message: String!
  }

  type BookPayload {
    errors: [Error!]!
    book: Book
  }

  input BooksInput {
    isRead: Boolean
  }

  input AddBookInput {
    title: String!
    author: String!
    categoryId: Int!
    isRead: Boolean!
  }

  input UpdateBookInput {
    id: Int
    title: String
    author: String
    CategoryId: Int
    isRead: Boolean
  }
`
