'use client'

// ─── Imports

import Link from 'next/link'
import styles from './UserMenu.module.scss'

import { Menu } from '@mantine/core'
import { Trash, User } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import ProfilePicture from '@/components/shared/ProfilePicture/ProfilePicture'
import { DASHBOARD_MENU_CONFIG } from '@/data/menu'

// ─── Componente UserMenu

export default function UserMenu() {
  const { user, logout } = useAuth()

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <div className={styles.userMenu}>
          <p>{user?.baseProfile.nome ?? 'Carregando...'}</p>
          <ProfilePicture image={user?.baseProfile.foto} size="md" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Admin</Menu.Label>
        {DASHBOARD_MENU_CONFIG[0]?.items.map((privateMenu) => {
          if (privateMenu.id === 'sair')
            return (
              <div key={privateMenu.id} className={styles.userDropdown_exitMenu}>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<Trash size={14} />} onClick={logout}>
                  Sair
                </Menu.Item>
              </div>
            )

          return (
            <Link key={privateMenu.id} href={privateMenu.path}>
              <Menu.Item leftSection={<User size={14} />}>{privateMenu.label}</Menu.Item>
            </Link>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
