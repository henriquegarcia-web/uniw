// ─── Imports ────────────────────────────────────────────────────────────────

import styles from './DashboardLayout.module.scss'

import { Header, SideMenu } from '@/components/layout'

// ─── Tipagens ───────────────────────────────────────────────────────────────

interface IDashboardLayoutProps {
  children: React.ReactNode
}

// ─── Componente DashboardLayout ─────────────────────────────────────────────

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
  return (
    <div className={styles.adminDashboard_layout}>
      <div className={styles.adminDashboard_menu}>
        <SideMenu />
      </div>
      <div className={styles.adminDashboard_content}>
        <div className={styles.adminDashboard_header}>
          <Header />
        </div>
        <div className={styles.adminDashboard_viewContainer}>
          <div className={styles.adminDashboard_viewWrapper}>{children}</div>
        </div>
      </div>
    </div>
  )
}
