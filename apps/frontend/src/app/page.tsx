import { Book, BookModel } from '~/components/book/book'

import { css } from 'styled-system/css'

const getData = async () => {
  // fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_BOOKS_API_URL}/books`);
  const data = await res.json();
  return data;
};

export default async function Home() {
  const data = await getData();
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
