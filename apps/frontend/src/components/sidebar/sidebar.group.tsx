'use client'

import * as SegmentGroup from '~/components/ui/segment-group'

import { useEffect, useState } from 'react'

import { Badge } from '~/components/ui/badge'
import { HStack } from 'styled-system/jsx'

interface Props {
  items: { href: string; title: string; label?: string }[]
  activeItem?: string | null
}

export const SidebarGroup = (props: Props) => {
  const { items = [], activeItem } = props
  const [active, setActive] = useState<string>()

  useEffect(() => {
    if (activeItem) {
      setActive(activeItem)
      return
    }
    setActive(window.location.pathname)
  }, [activeItem])

  return (
    <SegmentGroup.Root value={active} orientation="vertical" size={{ base: 'md', md: 'sm' }}>
      {items.map((item, id) => (
        <a key={id} href={item.href} style={{ display: 'flex', width: 'fit-content' }}>
          <SegmentGroup.Item value={item.href} data-orientation="vertical">
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemText>
              <HStack gap="2">
                {item.title}
                {item.label && <Badge size="sm">{item.label}</Badge>}
              </HStack>
            </SegmentGroup.ItemText>
          </SegmentGroup.Item>
        </a>
      ))}
      <SegmentGroup.Indicator hidden={!items.some((entry) => entry.href === active)} />
    </SegmentGroup.Root>
  )
}