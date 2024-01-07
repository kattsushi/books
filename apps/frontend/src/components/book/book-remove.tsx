import * as Dialog from '~/components/ui/dialog'

import { Button } from '~/components/ui/button';
import { IconButton } from '~/components/ui/icon-button'
import { Stack } from 'styled-system/jsx';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

export function BookRemove({
  confirm,
  children,
}: {
  children: React.ReactNode
  confirm: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Dialog.Trigger asChild>
          {children}
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Stack gap="8" p="6">
              <Stack gap="1">
                <Dialog.Title>Are you sure ?</Dialog.Title>
                <Dialog.Description>Are you sure want to delete this book?</Dialog.Description>
              </Stack>
              <Stack gap="3" direction="row" width="full">
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline" width="full">
                    Cancel
                  </Button>
                </Dialog.CloseTrigger>
                <Button onClick={()=> {
                  confirm()
                  setIsOpen(false)
                  }} width="full">Confirm</Button>
              </Stack>
            </Stack>
            <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
              <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
                <XIcon />
              </IconButton>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
  )
}