"use client";

import * as Dialog from "~/components/ui/dialog";

import { Input as ValiInput, number, object, optional, string } from "valibot";
import { setValue, useForm } from "@modular-forms/react";

import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { IconButton } from "~/components/ui/icon-button";
import { Input } from "~/components/ui/input";
import { Stack } from "styled-system/jsx";
import { XIcon } from "lucide-react";
import { css } from "styled-system/css";
import { useState } from "react";

const BookSchema = object({
  id: optional(number()),
  title: string(),
  status: string(),
  description: string(),
  cover: string(),
  author: string(),
  categories: string(),
});

type BookForm = ValiInput<typeof BookSchema>;

type BookFormProps = {
  children: React.ReactNode;
  book?: BookForm;
  handleCreated?: (book: BookForm) => void;
  handleUpdate?: (book: BookForm) => void;
};

export function BookForm({
  book,
  handleCreated,
  handleUpdate,
  children,
}: BookFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookForm, { Form, Field }] = useForm<BookForm>({
    initialValues: book,
  });

  const handleSubmit = async (data: BookForm) => {
    console.log('data', data)
    if (book && handleUpdate) {
      handleUpdate(data);
      setIsOpen(false);
      return
    }
    if (handleCreated) {
      handleCreated(data);
    }
    setIsOpen(false);
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Form onSubmit={handleSubmit}>
            <Stack gap="10" p="8" width='full'>
              <Stack alignContent={'start'} textAlign={'left  '} gap="3" width='full'>
                <Dialog.Title>
                  {book ? "Update" : "Create new"} Book
                </Dialog.Title>
                <Field name="id" type={'number'} keepActive={false}>
                  {(field, props) => (
                    <Stack gap="1.5" width="full">
                      <Input
                        {...props}
                        type="hidden"
                        defaultValue={field.value.value || ""}
                      />
                    </Stack>
                  )}
                </Field>
                <Field name="title">
                  {(field, props) => (
                    <Stack gap="1.5" width="full">
                      <FormLabel htmlFor={field.name}>Title</FormLabel>
                      <Input
                        {...props}
                        defaultValue={field.value.value || ""}
                        type="text"
                      />
                    </Stack>
                  )}
                </Field>
                <Field name="status">
                  {(field, props) => (
                    <Stack gap="1.5" width="full">
                      <FormLabel htmlFor={field.name}>Stock</FormLabel>
                      <select {...props} className={css({
                        appearance: 'none',
                        padding: '0.5rem 1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        color: '#4a5568',
                        backgroundColor: '#fff',
                        _dark: {
                          borderColor: '#2d3748',
                          color: '#edf2f7',
                          backgroundColor: '#2d3748',
                        },
                        width: '100%',
                        '&:focus': {
                          outline: 'none',
                          boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                          borderColor: '#4299e1',
                        },
                      })} id={field.name} defaultValue={field.value.value || ''} onChange={(e) => {
                        setValue(bookForm, field.name, e.target.value)
                      }}>
                        {[
                          { label: 'In Stock', value: 'in-stock' },
                          { label: 'Out of Stock', value: 'out-of-stock' },
                        ].map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </Stack>
                  )}
                </Field>
                <Field name="description">
                  {(field, props) => (
                    <Stack gap="1.5" width="full">
                      <FormLabel htmlFor={field.name}>Description</FormLabel>
                      <Input {...props}
                        id={field.name}
                        defaultValue={field.value.value || ""} type="text" />
                    </Stack>
                  )}
                </Field>
                <Field name="cover">
                  {(field, props) => (
                    <Stack gap="1.5" width="full">
                      <FormLabel htmlFor={field.name}>Cover</FormLabel>
                      <Input {...props}
                        id={field.name}
                        defaultValue={field.value.value || ""}type="text" />
                    </Stack>
                  )}
                </Field>
                <Field name="author">
                  {(field, props) => (
                    <Stack gap="1.5" width="full">
                      <FormLabel htmlFor={field.name}>Author</FormLabel>
                      <Input {...props}
                        id={field.name}
                        defaultValue={field.value.value || ""}type="text" />
                    </Stack>
                  )}
                </Field>
                <Field name="categories">
                  {(field, props) => (
                    <Stack gap="1.5" width="full">
                      <FormLabel htmlFor={field.name}>Categories</FormLabel>
                      <Input {...props}
                        id={field.name}
                        defaultValue={field.value.value || ""} type="text" />
                    </Stack>
                  )}
                </Field>
              </Stack>
              <Stack gap="3" direction="row" width="full">
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline" width="full">
                    Cancel
                  </Button>
                </Dialog.CloseTrigger>
                <Button type="submit" width="full">
                  Confirm
                </Button>
              </Stack>
            </Stack>
          </Form>
          <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
            <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
