'use client'

// ─── Imports ────────────────────────────────────────────────────────────────

import * as S from './styles'

import { Header, SideMenu } from '@/components/layout'

// ─── Tipagens ───────────────────────────────────────────────────────────────

interface IDashboardLayoutProps {
  children: React.ReactNode
}

// ─── Componente DashboardLayout ─────────────────────────────────────────────

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
  return (
    <S.DashboardLayoutScreen>
      <S.DashboardLayoutMenu>
        <SideMenu />
      </S.DashboardLayoutMenu>
      <S.DashboardLayoutContent>
        <S.DashboardLayoutHeader>
          <Header />
        </S.DashboardLayoutHeader>
        <S.DashboardLayoutViewsContainer>
          <S.DashboardLayoutViewsWrapper>{children}</S.DashboardLayoutViewsWrapper>
        </S.DashboardLayoutViewsContainer>
      </S.DashboardLayoutContent>
    </S.DashboardLayoutScreen>
  )
}
