/** @format */

import { Context } from './index'

type Book = {
  id: number
  title: string
  author: string
  isRead: boolean
}

type Category = {
  id: number
  name: string
}

type MutationBook = {
  input: {
    title: string
    author: string
    categoryId: number
    isRead: boolean
  }
}

type BookPayload = {
  errors: {
    message: string
  }[]
  book: Book | null
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
  addBook: async (_: any, { input }: MutationBook, { prisma }: Context): Promise<BookPayload> => {
    if (!input.title || !input.author || !input.categoryId || !input.isRead) {
      return {
        errors: [{ message: '本の内容を入力してください' }],
        book: null,
      }
    }

    const newBook = await prisma.book.create({
      data: input,
    })

    return {
      errors: [],
      book: newBook,
    }
  },
  deleteBook: async (_: any, { id }: { id: number }, { prisma }: Context): Promise<BookPayload> => {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })

    if (!book) {
      return {
        errors: [{ message: '本が見つかりませんでした' }],
        book: null,
      }
    }

    await prisma.book.delete({
      where: {
        id,
      },
    })

    return {
      errors: [],
      book,
    }
  },
  updateBook: async (
    _: any,
    { id, input }: { id: number; input: MutationBook['input'] },
    { prisma }: Context
  ): Promise<BookPayload> => {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })

    if (!book) {
      return {
        errors: [{ message: '本が見つかりませんでした' }],
        book: null,
      }
    }

    const updatedBook = await prisma.book.update({
      data: {
        ...input,
      },
      where: {
        id,
      },
    })

    return {
      errors: [],
      book: updatedBook,
    }
  },
}
