import { CreateBookDto } from './create-book.dto'
import { PickType } from '@nestjs/swagger'
// https://docs.nestjs.com/openapi/types-and-parameters#picktype
export class UpdateBookDto extends PickType(CreateBookDto, ['author', 'title', 'description', 'categories', 'cover']) {}
