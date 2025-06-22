'use client'

import { PasswordInput, PasswordInputProps } from '@mantine/core'

interface InputPasswordProps
  extends Omit<PasswordInputProps, 'value' | 'onChange' | 'error'> {
  value: string
  onChange: (value: string) => void
  error?: string
  withAsterisk?: boolean
}

export default function InputPassword({
  label,
  value,
  onChange,
  error,
  placeholder,
  withAsterisk = false,
  ...rest
}: InputPasswordProps) {
  return (
    <PasswordInput
      label={label}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder={placeholder}
      error={error}
      withAsterisk={withAsterisk}
      {...rest}
    />
  )
}
