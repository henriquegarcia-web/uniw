// src/contexts/SearchProvider.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface SearchContextData {
  searchTerm: string
  setSearchTerm: (term: string) => void
  clearSearch: () => void
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData)

type SearchProviderProps = {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, clearSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch(): SearchContextData {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch deve ser usado dentro de um SearchProvider')
  }
  return context
}
