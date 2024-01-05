import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const books = sqliteTable('Books', {
  id: integer('id').primaryKey(),
  title: text('title'),
  author: text('author'),
  year: text('year'),
  cover: text('cover'),
  description: text('description'),
  categories: text('categories'),
})
