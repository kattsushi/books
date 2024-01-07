"use client";

import * as Toast from '~/components/ui/toast'

import { Book, BookModel } from "~/components/book/book";
import { useEffect, useState } from "react";

import { BookForm } from "~/components/book/book-form";
import { IconButton } from '~/components/ui/icon-button'
import { PlusCircleIcon } from "lucide-react";
import { XIcon } from 'lucide-react'
import { createToaster } from '@ark-ui/react/toast'
import { css } from "styled-system/css";

const [Toaster, toast] = createToaster({
  placement: 'top-end',
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger asChild>
          <IconButton size="sm" variant="link">
            <XIcon />
          </IconButton>
        </Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})

export function BookList() {
  const [data, setData] = useState([]);

  const handleCreated = async (book: BookModel) => {
    try {
      // fetch
      const res = await fetch(`${process.env.NEXT_PUBLIC_BOOKS_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
        cache: "no-cache",
      });
      const data = await res.json();
      toast.success({ title: 'Book Saved ', description: 'Book Saved Successly' })
    } catch (error) {
      console.log(error)
      toast.error({ title: 'Error ', description: 'Error Saving Book' })
    }
    getData();
    return data;
  };

  const handleUpdate = async (book: BookModel) => {
    try {
      // fetch
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BOOKS_API_URL}/books/${book.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
          cache: "no-cache",
        }
      );
      const data = await res.json();
      toast.success({ title: 'Book Updated ', description: 'Book Updated Successly' })
    } catch (error) {
      console.log(error)
      toast.error({ title: 'Error ', description: 'Error Updating Book' })
    }
    getData();
    return data;
  };

  const handleDelete = async (book: BookModel) => {
    try {
      // fetch
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BOOKS_API_URL}/books/${book.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      toast.success({ title: 'Book Deleted ', description: 'Book Deleted Successly' })
    } catch (error) {
      console.log(error)
      toast.error({ title: 'Error ', description: 'Error Deleting Book' })
    }
    getData();
    return data;
  };

  const getData = async () => {
    setIsLoading(true)
    try {
      // fetch
      const res = await fetch(`${process.env.NEXT_PUBLIC_BOOKS_API_URL}/books`, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setIsLoading(false)
      setData(data);
    } catch (error) {
      setIsLoading(false)
      console.error(error);
      toast.error({ title: 'Error ', description: 'Error Fetching Books' })
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        className={css({
          gridTemplateColumns: "1",
          sm: {
            gridTemplateColumns: "2",
          },
          md: {
            gridTemplateColumns: "2",
          },
          lg: {
            gridTemplateColumns: "3",
          },
          gridGap: "4",
          display: "grid",
        })}
      >
        {data.map((book: BookModel, i) => (
          <Book
            handleUpdate={(bookUpdated) => handleUpdate(bookUpdated)}
            handleDelete={() => handleDelete(book)}
            key={i}
            book={book}
          />
        ))}
        {isLoading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
      </div>

      <BookForm handleCreated={(book) => handleCreated(book)}>
        <IconButton
          size={"xl"}
          className={css({
            position: "fixed",
            bottom: "10",
            right: "10",
            px: "3",
          })}
          aria-label="Next Page"
        >
          <PlusCircleIcon /> Add Book
        </IconButton>
      </BookForm>
      <Toaster />
    </>
  );
}
