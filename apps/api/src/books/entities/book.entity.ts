import { ApiProperty } from '@nestjs/swagger'

export class Book {
  @ApiProperty()
  id: number
  @ApiProperty()
  title: string
  @ApiProperty()
  description: string
  @ApiProperty()
  cover: string
  @ApiProperty()
  author: string
  @ApiProperty()
  categories: string
}
