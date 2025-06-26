'use client'

// ─── Imports

import { useState } from 'react'
import * as S from './styles'

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
    <S.Header>
      <S.HeaderTitle>
        <h3>{viewActive?.label || 'Tela não encontrada'}</h3>
      </S.HeaderTitle>
      <S.HeaderSearch>
        <TextInput
          leftSection={<Search size={20} />}
          value={searchValue}
          onChange={(e) => handleChangeSearchValue(e.currentTarget.value)}
          placeholder="Pesquisar"
          size="md"
        />
      </S.HeaderSearch>
      <S.HeaderMenus>
        <UserMenu />
      </S.HeaderMenus>
    </S.Header>
  )
}
