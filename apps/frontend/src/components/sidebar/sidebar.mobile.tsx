'use client'

import * as Drawer from '../ui/drawer'

import { MenuIcon, XIcon } from 'lucide-react'

import { IconButton } from '../ui/icon-button'
import { Logo } from '../ui/logo'
import { Portal } from '@ark-ui/react/portal'
import type { PropsWithChildren } from 'react'

export const MobileSidebarContainer = (props: PropsWithChildren) => (
  <Drawer.Root variant="left">
    <Drawer.Trigger asChild>
      <IconButton aria-label="Open Menu" variant="ghost" size="sm">
        <MenuIcon />
      </IconButton>
    </Drawer.Trigger>
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header pt="5">
            <a href="/" aria-label="Go to start page">
              <Logo />
            </a>
            <Drawer.CloseTrigger position="absolute" asChild>
              <IconButton aria-label="Close Sidebar" variant="ghost" top="3" right="4">
                <XIcon />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body>{props.children}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  </Drawer.Root>
)