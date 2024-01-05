import * as Card from '~/components/ui/card'

import { Button } from '~/components/ui/button'
import type { CardProps } from '~/components/ui/card'
import Image from 'next/image'
import { Stack } from 'styled-system/jsx'

export type BookModel = {
  title: string
  description: string
  cover: string
  author: string
  price: number
  categories: string
}

type BookProps = {
  book: BookModel
} & CardProps

export function Book({book, ...props}: BookProps) {
  return (
    <Card.Root width="12/12" {...props}>
      <Card.Header>
        <Card.Title>{book.title}</Card.Title>
        <Card.Description>{book.description}</Card.Description>
      </Card.Header>
      <Card.Body>
        <img alt={book.title} src={book.cover} width={300} />
      </Card.Body>
      <Card.Footer gap="3">
        <Button>Add to Favorites</Button>
      </Card.Footer>
    </Card.Root>
  )
}