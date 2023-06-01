/** @format */

import { Context } from './index'

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

type AddBookInput = {
  id: number
  title: string
  author: string
  categoryId: number
  isRead: boolean
}

export const Query = {
  books: (_: any, { isRead }: { isRead: boolean }, { prisma }: Context) => {
    return prisma.book.findMany({
      where: {
        isRead,
      },
    })
  },
  book: (_: any, { id }: { id: number }, { prisma }: Context) => {
    return prisma.book.findUnique({
      where: {
        id,
      },
    })
  },
  categories: (_: any, __: any, { prisma }: Context) => {
    return prisma.category.findMany()
  },
  category: (_: any, { id }: { id: number }, { prisma }: Context) => {
    return prisma.category.findUnique({
      where: {
        id,
      },
    })
  },
}

// Category側のidとBook側のcategoryIdの紐づけ
export const Category = {
  books: ({ id }: { id: number }, _: any, { prisma }: Context) => {
    return prisma.book.findMany({
      where: {
        categoryId: id,
      },
    })
  },
}

export const Book = {
  category: ({ categoryId }: { categoryId: number }, _: any, { prisma }: Context) => {
    return prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })
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
