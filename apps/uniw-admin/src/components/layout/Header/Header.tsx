'use client'

// ─── Imports

import { useState } from 'react'
import styles from './Header.module.scss'

import { TextInput } from '@mantine/core'
import { Search } from 'lucide-react'

import { UserMenu } from '@/components/layout'
import { useAdminMenu } from '@/contexts/AdminMenuContext'

// ─── Componente Header

export default function Header() {
  const { viewActive } = useAdminMenu()

  const [searchValue, setSearchValue] = useState('')

  const handleChangeSearchValue = (value: string) => setSearchValue(value)

  return (
    <header className={styles.header}>
      <div className={styles.header_viewTitle}>
        <h3>{viewActive?.label || 'Tela não encontrada'}</h3>
      </div>
      <div className={styles.header_search}>
        <TextInput
          leftSection={<Search size={20} />}
          value={searchValue}
          onChange={(e) => handleChangeSearchValue(e.currentTarget.value)}
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
