// ─── Imports ────────────────────────────────────────────────────────────────

import { DashboardLayout } from '@/components/layouts'

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
