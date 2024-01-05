import { BooksController } from './books.controller'
import { BooksService } from './books.service'
import { DatabaseModule } from 'src/database/database.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
