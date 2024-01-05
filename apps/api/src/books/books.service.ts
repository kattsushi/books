import { CreateBookDto } from './dto/create-book.dto'
import { Inject, Injectable } from '@nestjs/common'
import { UpdateBookDto } from './dto/update-book.dto'
import { promises as fs } from 'fs'
import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { eq } from 'drizzle-orm'
import * as schema from './../database/schema'
import { Book } from './entities/book.entity'
@Injectable()
export class BooksService {
  constructor(@Inject('DB_PROD') private drizzleProd: LibSQLDatabase<typeof schema>) {}

  async seed() {
    const file = await fs.readFile(process.cwd() + '/src/database/seed-books.json', 'utf8')
    const data = await JSON.parse(file)
    return (await this.drizzleProd.insert(schema.books).values(data)).rowsAffected
  }

  async create(createBookDto: CreateBookDto) {
    const createdBook = await this.drizzleProd
      .insert(schema.books)
      .values(createBookDto)
      .returning({ createdId: schema.books.id })
    return createdBook
  }

  async findAll() {
    const books = (await this.drizzleProd.query.books.findMany()) as any as Book[]
    return books
  }

  async findOne(id: number) {
    const foundBook = await this.drizzleProd.query.books.findMany({ where: eq(schema.books.id, id) })
    return foundBook
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.drizzleProd
      .update(schema.books)
      .set(updateBookDto)
      .where(eq(schema.books.id, id))
      .returning({ updatedId: schema.books.id })

    return updatedBook
  }

  async remove(id: number) {
    const removedBook = await this.drizzleProd
      .delete(schema.books)
      .where(eq(schema.books.id, id))
      .returning({ removedId: schema.books.id })
    return removedBook
  }
}
