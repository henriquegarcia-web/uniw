'use client'

import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core'

interface ButtonProps extends MantineButtonProps {
  children: React.ReactNode
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <MantineButton type="submit" fullWidth {...rest}>
      {children}
    </MantineButton>
  )
}
