// ─── Imports ────────────────────────────────────────────────────────────────

import styles from './DashboardLayout.module.scss'

// ─── Tipagens ───────────────────────────────────────────────────────────────

interface IDashboardLayoutProps {
  children: React.ReactNode
}

// ─── Componente DashboardLayout ─────────────────────────────────────────────

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
  return (
    <div className={styles.adminDashboard_screen}>
      <div className={styles.adminDashboard_menu}></div>
      <div className={styles.adminDashboard_content}>
        <div className={styles.adminDashboard_header}></div>
        <div className={styles.adminDashboard_viewContainer}>{children}</div>
      </div>
    </div>
  )
}
