'use client'

import { ActionIcon } from '@mantine/core'
// ─── Imports

import * as S from './styles'
import { X } from 'lucide-react'

// ─── Tipagens Drawer

interface IDrawer {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  opened: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

// ─── Componente Drawer

export default function Drawer({
  size = 'md',
  opened,
  onClose,
  title,
  children,
}: IDrawer) {
  return (
    <S.Drawer
      opened={opened}
      onClose={onClose}
      title={<DrawerHeader title={title} onClose={onClose} />}
      size={size}
      position="right"
      withCloseButton={false}
    >
      {children}
    </S.Drawer>
  )
}

// ─── Componente Drawer Header

interface IDrawerHeader {
  title: string
  onClose: () => void
}

function DrawerHeader({ title, onClose }: IDrawerHeader) {
  return (
    <S.DrawerHeader>
      <S.DrawerHeaderTitle>{title}</S.DrawerHeaderTitle>
      <ActionIcon color="white" variant="transparent" onClick={onClose}>
        <X size={22} />
      </ActionIcon>
    </S.DrawerHeader>
  )
}
