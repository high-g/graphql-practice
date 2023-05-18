/** @format */

export const books = [
  {
    id: 1,
    title: 'オズの魔法使',
    author: 'ライマン・フランク・ボーム',
    categoryId: 'literature',
    isRead: true,
  },
  {
    id: 2,
    title: '風と共に去りぬ',
    author: 'マーガレット・ミッチェル',
    categoryId: 'literature',
    isRead: false,
  },
  {
    id: 3,
    title: '人を動かす',
    author: 'D・カーネギー',
    categoryId: 'self-help',
    isRead: false,
  },
]

export const categories = [
  {
    id: 'literature',
    name: '文学',
  },
  {
    id: 'self-help',
    name: '自己啓発',
  },
]
