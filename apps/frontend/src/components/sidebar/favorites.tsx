/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from "react"

import { SidebarGroup } from "./sidebar.group"
import { Stack } from "styled-system/jsx"
import { Text } from "~/components/ui/text"

export function Favorites() {
  const [ favorites, setFavorites ] = useState()

  useEffect(() => {
    const favorites = localStorage.getItem('favorites')
    if (favorites) {
      const favoritesMap = JSON.parse(favorites).map((favorite: any) => ({
        href: `/book/${favorite.id}`,
        title: favorite.title
      }))
      setFavorites(favoritesMap || [])
    }
    window.addEventListener('storage', () => {
      const newFavorites = localStorage.getItem('favorites')
      if (newFavorites) {
        const favoritesMap = JSON.parse(newFavorites).map((favorite: any) => ({
          href: `/book/${favorite.id}`,
          title: favorite.title
        }))
        setFavorites(favoritesMap || [])
      }
      // ...
    });

    return () => {
      window.removeEventListener('storage', () => {
        console.info('removed event listener')
      });
    }
  }, [])
  return (
    <Stack gap="3">
        <Text textStyle={{ md: 'sm' }} fontWeight="semibold" textTransform="capitalize">
          Favorites
        </Text>
        {favorites && (
          <SidebarGroup items={favorites} />
        )}
    </Stack>
  )
}