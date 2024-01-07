import { BookModel } from "../book/book";
import { Favorites } from "./favorites";
import { SidebarGroup } from "./sidebar.group";
import { Stack } from "styled-system/jsx";
import { Text } from '~/components/ui/text'

const getData = async () => {
  // fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_BOOKS_API_URL}/books`);
  const data = await res.json();
  return data;
};

export async function Sidebar() {
  const data = await getData();
  let categories: any[] = []
  data.forEach((book: BookModel) => {
    const bookCategories = book.categories?.split(',').map((category) => category.trim()) || [];
    categories = [...categories, ...bookCategories];
  });
  categories = Array.from(new Set(categories)).map((category) => ({
    href: `/category/${category}`,
    title: category.replace(/\b\w/g, function (char: string) {
      return char.toUpperCase();
    })
  }));
  return (
    <Stack gap="8">
      <Stack gap="3">
          <Text textStyle={{ md: 'sm' }} fontWeight="semibold" textTransform="capitalize">
            Categories
          </Text>
          <SidebarGroup items={categories} />
      </Stack>
      <Favorites />
    </Stack>
  )
}