/** @format */

import { Context } from './index'
import { books, categories } from './database'

type ArgType = {
  id: number | string
}

type Book = {
  id: number
  title: string
  author: string
  createdAt: string
  isRead: boolean
}

type Category = {
  id: string
  name: string
}

type ArgFilterType = {
  filter: {
    isRead: boolean
  }
}

type AddBookInput = {
  id: number
  title: string
  author: string
  categoryId: number
  isRead: boolean
}

export const Query = {
  books: (_: any, __: any, { prisma }: Context) => {
    return prisma.book.findMany()
  },
  book: (_: any, args: ArgType) => {
    const bookId = args.id
    const book = books.find((book) => book.id === bookId)
    if (!book) return null
    return book
  },
  categories: () => categories,
  category: (_: any, args: ArgType) => {
    const categoryId = args.id
    const category = categories.find((category) => category.id === categoryId)
    if (!category) return null
    return category
  },
}

export const Category = {
  books: (parent: any, args: ArgType) => {
    return books.filter((book) => book.categoryId === parent.id)
  },
}

export const Book = {
  category: (parent: any, args: ArgType) => {
    return categories.find((category) => category.id === parent.categoryId)
  },
}

export const Mutation = {
  addBook: (_: any, { input }: { input: AddBookInput }, { books }: { books: Book[] }) => {
    console.log('[addBook] input: ', input)
    console.log('[addBook] books: ', books)
    const { id, title, author, categoryId, isRead } = input

    const newBook = {
      id,
      title,
      author,
      categoryId,
      isRead,
    }

    //books.push(newBook)

    return newBook
  },
}
