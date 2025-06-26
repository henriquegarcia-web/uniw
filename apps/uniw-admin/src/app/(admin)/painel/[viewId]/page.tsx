'use client'

// ─── Imports ────────────────────────────────────────────────────────────────

import { RenderedView } from '@/components/layout/'
import { DashboardLayoutPage } from '@/components/layouts/DashboardLayout/styles'

// ─── Tipagens ───────────────────────────────────────────────────────────────

// ─── Componente AdminView ───────────────────────────────────────────────────

export default function AdminView() {
  return (
    <DashboardLayoutPage>
      <RenderedView />
    </DashboardLayoutPage>
  )
}
