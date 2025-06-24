// ─── Imports ────────────────────────────────────────────────────────────────

import { DashboardLayout } from '@/components/layouts'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@mantine/core'

// ─── Metadados da Rota ──────────────────────────────────────────────────────

// export const metadata = mainMetadata

// ─── Componente AdminLayout ─────────────────────────────────────────────────

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout>{children}</DashboardLayout>
}

// const { logout } = useAuth()
// <Button onClick={logout}>Sair</Button>
