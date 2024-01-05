import { Book, BookModel } from '~/components/book/book'

import { css } from 'styled-system/css'
import { promises as fs } from 'fs';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/data/books.json', 'utf8');
  const data = await JSON.parse(file);
  return (
    <main>
      <div className={css({
        gridTemplateColumns: '3',
        gridGap: '4',
        display: 'grid',
      })}>
        {data.map((book: BookModel) => (
          <Book key={book.title} book={book}/>
        ))}
      </div>
    </main>
  )
}
