'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { getMenuItemFromPath } from '@/utils/navigation'
import { DASHBOARD_MENU_CONFIG } from '@/data/menu'
import type { MenuItem, MenuGroup } from '@/types/menu'

// Define a "forma" dos dados que o contexto irá fornecer
interface AdminMenuContextType {
  viewActive: MenuItem | null
  menuConfig: MenuGroup[]
}

// Cria o contexto com um valor inicial undefined
const AdminMenuContext = createContext<AdminMenuContextType | undefined>(undefined)

/**
 * Provider que envolve a aplicação e fornece os dados do menu e da view ativa.
 */
export const AdminMenuProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [viewActive, setViewActive] = useState<MenuItem | null>(null)

  // Efeito que executa sempre que o pathname (URL) muda
  useEffect(() => {
    // Calcula o item de menu ativo a partir do pathname atual
    const activeItem = getMenuItemFromPath(pathname) || null
    setViewActive(activeItem)
  }, [pathname])

  // O valor fornecido inclui a view ativa e a configuração total do menu
  const value: AdminMenuContextType = {
    viewActive,
    menuConfig: DASHBOARD_MENU_CONFIG,
  }

  return <AdminMenuContext.Provider value={value}>{children}</AdminMenuContext.Provider>
}

/**
 * Hook customizado para consumir facilmente os dados do AdminMenuContext.
 * Garante que o hook seja usado dentro do seu provider.
 */
export const useAdminMenu = (): AdminMenuContextType => {
  const context = useContext(AdminMenuContext)
  if (context === undefined) {
    throw new Error('useAdminMenu deve ser usado dentro de um AdminMenuProvider')
  }
  return context
}
