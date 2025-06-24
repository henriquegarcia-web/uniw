'use client'

// ─── Imports

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Header.module.scss'

import { Search } from 'lucide-react'

import { getMenuItemFromPath } from '@/utils/navigation'
import { InputText } from '@/components/inputs'
import { UserMenu } from '@/components/layout'
import { MenuItem } from '@/types/menu'

// ─── Componente Header

export default function Header() {
  const pathname = usePathname()
  const viewActive: MenuItem | null = getMenuItemFromPath(pathname) || null

  const [searchValue, setSearchValue] = useState('')

  const handleChangeSearchValue = (value: string) => setSearchValue(value)

  return (
    <header className={styles.header}>
      <div className={styles.header_viewTitle}>
        <h3>{viewActive?.label || 'Tela não encontrada'}</h3>
      </div>
      <div className={styles.header_search}>
        <InputText
          leftSection={<Search size={20} />}
          value={searchValue}
          onChange={handleChangeSearchValue}
          placeholder="Pesquisar"
          size="md"
        />
      </div>
      <div className={styles.header_menus}>
        <UserMenu />
      </div>
    </header>
  )
}
