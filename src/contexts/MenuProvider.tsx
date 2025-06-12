import React, { createContext, useState, useContext, ReactNode } from 'react'

interface MenuContextData {
  isOpen: boolean
  openMenu(): void
  closeMenu(): void
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData)

type MenuProviderProps = {
  children: ReactNode
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openMenu = () => setIsOpen(true)
  const closeMenu = () => setIsOpen(false)

  return (
    <MenuContext.Provider value={{ isOpen, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu(): MenuContextData {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu deve ser usado dentro de um MenuProvider')
  }
  return context
}
