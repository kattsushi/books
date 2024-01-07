import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';
import { type HTMLStyledProps, Stack, styled } from 'styled-system/jsx'

import { FormLabel } from '~/components/ui/form-label';
import { ReadonlySignal } from '@preact/signals-react';
import { ark } from '@ark-ui/react/factory'
import { input } from 'styled-system/recipes'

type TextInputProps = {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
  label?: string;
  placeholder?: string;
  value: ReadonlySignal<string | undefined>;
  error: ReadonlySignal<string>;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
};

export const Input = styled(ark.input, input)
export interface InputProps extends HTMLStyledProps<typeof Input> {}
