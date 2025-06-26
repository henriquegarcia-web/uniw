'use client'

// ─── Imports

import * as S from './styles'

import { useAdminMenu } from '@/contexts/AdminMenuContext'

// ─── Tipagens ViewHeader

// ─── Componente ViewHeader

export default function ViewHeader({}) {
  const { viewActive } = useAdminMenu()

  return (
    <S.ViewHeader>
      <h1>{viewActive?.title}</h1>
      <p>{viewActive?.subtitle}</p>
    </S.ViewHeader>
  )
}
