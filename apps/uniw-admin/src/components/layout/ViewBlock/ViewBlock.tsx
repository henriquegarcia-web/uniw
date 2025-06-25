'use client'

// ─── Imports

import styles from './ViewBlock.module.scss'

// ─── Tipagens ViewBlock

interface IViewBlock {
  title: string
  children: React.ReactNode
}

// ─── Componente ViewBlock

export default function ViewBlock({ title, children }: IViewBlock) {
  return (
    <div className={styles.viewBlock}>
      <h2 className={styles.viewBlock_header}>{title}</h2>
      <div className={styles.viewBlock_content}>{children}</div>
    </div>
  )
}
