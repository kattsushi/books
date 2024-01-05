import { BookModel } from "../book/book";
import { SidebarGroup } from "./sidebar.group";
import { Stack } from "styled-system/jsx";
import { Text } from '~/components/ui/text'
import { promises as fs } from 'fs';

export async function Sidebar() {
  const file = await fs.readFile(process.cwd() + '/src/data/books.json', 'utf8');
  const data = await JSON.parse(file) as BookModel[];
  let categories: any[] = []
  data.forEach((book: BookModel) => {
    const bookCategories = book.categories.split(',').map((category) => category.trim());
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
    </Stack>
  )
}