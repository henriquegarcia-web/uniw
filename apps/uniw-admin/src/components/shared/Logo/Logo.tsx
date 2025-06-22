// ─── Imports ────────────────────────────────────────────────────────────────

import styles from './Logo.module.scss'

import Image from 'next/image'
import Link from 'next/link'

// ─── Componente Logo ────────────────────────────────────────────────────────

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/uniw_logo.png"
        alt="Logo da UNIW"
        width={146}
        height={44}
        priority
        className={styles.logoImage}
      />
    </Link>
  )
}
