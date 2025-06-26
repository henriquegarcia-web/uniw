// ─── Imports

import * as S from './styles'

// ─── Tipagens ViewBlock

interface IViewBlock {
  title: string
  children: React.ReactNode
}

// ─── Componente ViewBlock

export default function ViewBlock({ title, children }: IViewBlock) {
  return (
    <S.ViewBlock>
      <S.ViewBlockHeader>{title}</S.ViewBlockHeader>
      <S.ViewBlockContent>{children}</S.ViewBlockContent>
    </S.ViewBlock>
  )
}
