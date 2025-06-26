'use client'

// ─── Imports ────────────────────────────────────────────────────────────────

import Image from 'next/image'

import * as S from './styles'

// ─── Tipagens ───────────────────────────────────────────────────────────────

interface IAdminAuthLayoutProps {
  children: React.ReactNode
}

// ─── Componente AdminAuthLayout ─────────────────────────────────────────────

export default function AdminAuthLayout({ children }: IAdminAuthLayoutProps) {
  return (
    <S.AuthLayoutScreen>
      <S.AuthLayoutScreenBackground>
        <Image src="/bg_auth.png" alt="Background" width={1000} height={1280} />
      </S.AuthLayoutScreenBackground>
      <S.AuthLayoutContainer>
        <S.AuthLayoutContainerHeader></S.AuthLayoutContainerHeader>
        <S.AuthLayoutContainerContent>{children}</S.AuthLayoutContainerContent>
      </S.AuthLayoutContainer>
    </S.AuthLayoutScreen>
  )
}
