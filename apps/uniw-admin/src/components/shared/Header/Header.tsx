// ─── Imports ────────────────────────────────────────────────────────────────

import styles from './Header.module.scss'

import Logo from '@/components/shared/Logo/Logo'

// ─── Componente Header ──────────────────────────────────────────────────────

export default function Header() {
  return (
    <header className={styles.header} aria-label="Cabeçalho da aplicação">
      <div className={styles.header_wrapper}>
        <div className={styles.header_logoContainer}>
          <Logo />
        </div>
      </div>
    </header>
  )
}
