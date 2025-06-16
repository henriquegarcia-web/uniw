// src/contexts/ClientProfileProvider.tsx

import React, { createContext, useContext, ReactNode, useState } from 'react'
import * as profileService from '@/services/profile'
import { useClientAuth } from './ClientAuthProvider'

interface ProfileContextData {
  isProfileLoading: boolean
  favorites: string[]
  isFavorite: (productId: string) => boolean
  addFavorite: (productId: string) => Promise<void>
  removeFavorite: (productId: string) => Promise<void>
}

const ProfileContext = createContext<ProfileContextData>({} as ProfileContextData)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useClientAuth()

  const [isProfileLoading, setIsProfileLoading] = useState(true)

  const favorites = user?.clienteProfile?.favoritos || []

  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId)
  }

  const addFavorite = async (productId: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    await profileService.addFavoriteProduct(user.id, productId)
    setIsProfileLoading(false)
  }

  const removeFavorite = async (productId: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    await profileService.removeFavoriteProduct(user.id, productId)
    setIsProfileLoading(false)
  }

  return (
    <ProfileContext.Provider
      value={{ isProfileLoading, favorites, isFavorite, addFavorite, removeFavorite }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useClientProfile(): ProfileContextData {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile deve ser usado dentro de um ProfileProvider')
  }
  return context
}
