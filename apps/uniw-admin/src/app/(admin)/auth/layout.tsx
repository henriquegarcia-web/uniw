// ─── Imports ────────────────────────────────────────────────────────────────

import { AuthLayout as AdminAuthLayout } from '@/components/layouts'
import { AuthProvider } from '@/contexts/AuthContext'

// ─── Metadados da Rota ──────────────────────────────────────────────────────

// export const metadata = mainMetadata

// ─── Componente AuthLayout ──────────────────────────────────────────────────

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminAuthLayout>
      <AuthProvider>{children}</AuthProvider>
    </AdminAuthLayout>
  )
}
