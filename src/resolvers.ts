/** @format */

import { books, categories } from './database'

type ArgsType = {
  id: number | string
}

export const Query = {
  books: () => books,
  book: (_: any, args: ArgsType) => {
    const bookId = args.id
    const book = books.find((book) => book.id === bookId)
    if (!book) return null
    return book
  },
  categories: () => categories,
  category: (_: any, args: ArgsType) => {
    const categoryId = args.id
    const category = categories.find((category) => category.id === categoryId)
    if (!category) return null
    return category
  },
}
