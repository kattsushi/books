import { ApiProperty } from '@nestjs/swagger'

export class CreateBookDto {
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
  @ApiProperty()
  status: 'in-stock' | 'out-of-stock'
}
