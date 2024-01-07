import { BookList } from '~/components/book/book-list';
import { css } from 'styled-system/css'

export default async function Home() {
  return (
    <main className={css({ position: 'relative' })}>
      <BookList/>
    </main>
  )
}
