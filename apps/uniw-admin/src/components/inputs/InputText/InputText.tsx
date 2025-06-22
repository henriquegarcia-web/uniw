'use client'

import { TextInput, TextInputProps } from '@mantine/core'

interface InputTextProps extends Omit<TextInputProps, 'value' | 'onChange' | 'error'> {
  value: string
  onChange: (value: string) => void
  error?: string
  withAsterisk?: boolean
}

export default function InputText({
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  withAsterisk = false,
  ...rest
}: InputTextProps) {
  return (
    <TextInput
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder={placeholder}
      error={error}
      withAsterisk={withAsterisk}
      {...rest}
    />
  )
}
