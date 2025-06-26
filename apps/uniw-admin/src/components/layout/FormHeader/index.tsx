'use client'

// ─── Imports

import * as S from './styles'

// ─── Tipagens FormHeader

interface IFormHeader {
  title: string
}

// ─── Componente FormHeader

export default function FormHeader({ title }: IFormHeader) {
  return (
    <S.FormHeader>
      <h3>{title}</h3>
    </S.FormHeader>
  )
}
