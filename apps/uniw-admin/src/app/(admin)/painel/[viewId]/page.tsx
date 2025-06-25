// ─── Imports ────────────────────────────────────────────────────────────────

import { RenderedView } from '@/components/layout/'
import styles from '@/components/layouts/DashboardLayout/DashboardLayout.module.scss'

// ─── Tipagens ───────────────────────────────────────────────────────────────

// ─── Componente AdminView ───────────────────────────────────────────────────

export default function AdminView() {
  return (
    <div className={styles.adminDashboard_view}>
      <RenderedView />
    </div>
  )
}
