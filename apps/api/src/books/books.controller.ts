import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { ApiAcceptedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Book } from './entities/book.entity'

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('seed')
  seed() {
    return this.booksService.seed()
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto)
  }

  @Get()
  @ApiOkResponse({
    type: [Book],
  })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    type: Book,
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id)
  }

  @Put(':id')
  @ApiAcceptedResponse({
    type: Book,
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(Number(id), updateBookDto)
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    type: Book,
  })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id)
  }
}
