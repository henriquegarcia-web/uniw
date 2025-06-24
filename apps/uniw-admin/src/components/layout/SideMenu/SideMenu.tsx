'use client'

// ─── Imports

import { DASHBOARD_MENU_CONFIG } from '@/data/menu'
import styles from './SideMenu.module.scss'

import { Logo } from '@/components/shared'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/inputs'

// ─── Componente SideMenu

export default function SideMenu() {
  const pathname = usePathname()

  return (
    <div className={styles.sideMenu}>
      <div className={styles.sideMenu_header}>
        <Logo size="sm" />
      </div>
      <nav className={styles.sideMenu_wrapper}>
        {DASHBOARD_MENU_CONFIG.map((group) => {
          if (!group.isVisible) return

          return (
            <div key={group.title} className={styles.menuGroup}>
              <h3 className={styles.menuGroup_title}>{group.title}</h3>
              <nav className={styles.menuGroup_list}>
                {group.items.map((item) => {
                  const isActive = pathname === item.path
                  const variant = isActive ? 'filled' : 'light'
                  return (
                    <Link key={item.id} href={item.path}>
                      <Button
                        variant={variant}
                        justify="left"
                        leftSection={item.icon}
                        rightSection={<span />}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
