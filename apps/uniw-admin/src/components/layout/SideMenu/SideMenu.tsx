'use client'

// ─── Imports

import Link from 'next/link'
import styles from './SideMenu.module.scss'

import { Button } from '@mantine/core'

import { DASHBOARD_MENU_CONFIG } from '@/data/menu'
import { Logo } from '@/components/shared'
import { IAdminProfile } from '@uniw/shared-types'
import { useAdminMenu } from '@/contexts/AdminMenuContext'
import { useAuth } from '@/contexts/AuthContext'

// ─── Função Auxiliar SideMenu

function hasPermission(
  permissions: IAdminProfile['permissoes'] | undefined,
  requiredPermission: keyof IAdminProfile['permissoes'] | null,
): boolean {
  if (requiredPermission === null) {
    return true
  }
  if (!permissions || !permissions[requiredPermission]) {
    return false
  }
  return true
}

// ─── Componente SideMenu

export default function SideMenu() {
  const { viewActive, menuConfig } = useAdminMenu()
  const { user } = useAuth()
  const userPermissions = user?.adminProfile?.permissoes

  return (
    <div className={styles.sideMenu}>
      <div className={styles.sideMenu_header}>
        <Logo size="sm" href={DASHBOARD_MENU_CONFIG[1]?.items[0]?.path} />
      </div>
      <nav className={styles.sideMenu_wrapper}>
        {menuConfig.map((group) => {
          if (!group.isVisible) return null
          const visibleItems = group.items.filter((item) =>
            hasPermission(userPermissions, item.requiredPermission),
          )
          if (visibleItems.length === 0) return null

          return (
            <div key={group.title} className={styles.menuGroup}>
              <h3 className={styles.menuGroup_title}>{group.title}</h3>
              <nav className={styles.menuGroup_list}>
                {group.items.map((item) => {
                  const isActive = viewActive?.id === item.id
                  const isDisabled = !item.active
                  const variant = isActive ? 'filled' : 'light'

                  return (
                    <Link key={item.id} href={item.path}>
                      <Button
                        variant={variant}
                        justify="left"
                        leftSection={item.icon}
                        rightSection={<span />}
                        disabled={isDisabled}
                        fullWidth
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
