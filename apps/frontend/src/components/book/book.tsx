'use client'

import * as Card from '~/components/ui/card'
import * as Tooltip from '~/components/ui/tooltip'

import { BookHeartIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { BookForm } from '~/components/book/book-form'
import { BookRemove } from '~/components/book/book-remove'
import type { CardProps } from '~/components/ui/card'
import { IconButton } from '~/components/ui/icon-button'

export type BookModel = {
  id?: number
  title: string
  status: string
  description: string
  cover: string
  author: string
  categories: string
}

type BookProps = {
  book: BookModel
  handleDelete: () => void
  handleUpdate?: (book: BookModel) => void
} & CardProps


const CustomTooltip = ({ children, ...props }: any) => {
  return (
    <Tooltip.Root positioning={{ placement: 'top' }}>
      <Tooltip.Trigger>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
        <Tooltip.Content>
          {props.content}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}

export function Book({book, handleDelete, handleUpdate, ...props}: BookProps) {

  const handleAddToFavorites = () => {
    const favorites = localStorage.getItem('favorites') || '[]'
    const favoritesArray = JSON.parse(favorites)
    favoritesArray.push(book)
    localStorage.setItem('favorites', JSON.stringify(favoritesArray))
    window.dispatchEvent(new Event('storage'))
  }
  return (
    <Card.Root width="12/12" {...props}>
      <Card.Header>
        <Card.Title>{book.title}</Card.Title>
        <Card.Description>{book.description}</Card.Description>
      </Card.Header>
      <Card.Body mx="auto">
        <img alt={book.title} src={book.cover} width={300} />
      </Card.Body>
      <Card.Footer gap="3" justifyContent={'flex-start'}>
        <CustomTooltip content='Add this book to your Favs'>
          <IconButton onClick={handleAddToFavorites} variant={'outline'} aria-label="Add to Favorites">
            <BookHeartIcon />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip content='Edit this book'>
          <BookForm handleUpdate={handleUpdate} book={book}>
            <IconButton variant={'outline'} aria-label="Edit">
              <PencilIcon />
            </IconButton>
          </BookForm>
        </CustomTooltip>
        <CustomTooltip content='Remove this book'>
          <BookRemove confirm={handleDelete}>
            <IconButton variant={'outline'} colorPalette={'red'} aria-label="Delete">
              <Trash2Icon />
            </IconButton>
          </BookRemove>
        </CustomTooltip>
      </Card.Footer>
    </Card.Root>
  )
}