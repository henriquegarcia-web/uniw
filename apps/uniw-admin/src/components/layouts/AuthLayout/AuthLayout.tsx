// ─── Imports ────────────────────────────────────────────────────────────────

import Image from 'next/image'

import styles from './AuthLayout.module.scss'

// ─── Tipagens ───────────────────────────────────────────────────────────────

interface IAdminAuthLayoutProps {
  children: React.ReactNode
}

// ─── Componente AdminAuthLayout ─────────────────────────────────────────────

export default function AdminAuthLayout({ children }: IAdminAuthLayoutProps) {
  return (
    <div className={styles.adminAuth_screen}>
      <div className={styles.adminAuth_image}>
        <Image src="/bg_auth.png" alt="Background" width={1000} height={1280} />
      </div>
      <div className={styles.adminAuth_container}>
        {/* <AuthHeader /> */}
        <div className={styles.adminAuth_container__content}>{children}</div>
      </div>
    </div>
  )
}
