'use client'

// ─── Imports

import styles from './ViewHeader.module.scss'

import { useAdminMenu } from '@/contexts/AdminMenuContext'

// ─── Tipagens ViewHeader

// ─── Componente ViewHeader

export default function ViewHeader({}) {
  const { viewActive } = useAdminMenu()

  return (
    <header className={styles.viewHeader}>
      <h1>{viewActive?.title}</h1>
      <p>{viewActive?.subtitle}</p>
    </header>
  )
}
