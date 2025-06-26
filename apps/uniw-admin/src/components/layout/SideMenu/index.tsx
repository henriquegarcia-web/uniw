'use client'

// ─── Imports

import Link from 'next/link'
import * as S from './styles'

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
    <S.SideMenu>
      <S.SideMenuHeader>
        <Logo size="sm" href={DASHBOARD_MENU_CONFIG[1]?.items[0]?.path} />
      </S.SideMenuHeader>
      <S.SideMenuWrapper>
        {menuConfig.map((group) => {
          if (!group.isVisible) return null
          const visibleItems = group.items.filter((item) =>
            hasPermission(userPermissions, item.requiredPermission),
          )
          if (visibleItems.length === 0) return null

          return (
            <S.MenuGroup key={group.title}>
              <S.MenuGroupTitle>{group.title}</S.MenuGroupTitle>
              <S.MenuGroupList>
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
              </S.MenuGroupList>
            </S.MenuGroup>
          )
        })}
      </S.SideMenuWrapper>
    </S.SideMenu>
  )
}
