// src/contexts/HelpCenterProvider.tsx

import React, { createContext, useContext, ReactNode, useState } from 'react'
import { useClientAuth } from './ClientAuthProvider'
import * as supportService from '@/services/support'
import { ISupportTicket } from '@/types/support'

interface HelpCenterContextData {
  isLoading: boolean
  error: any | null
  tickets: ISupportTicket[]
  submitSupportTicket: (data: {
    subject: string
    message: string
    orderId?: string
  }) => Promise<void>
  loadUserTickets: () => Promise<void>
}

const HelpCenterContext = createContext<HelpCenterContextData>(
  {} as HelpCenterContextData,
)

export const HelpCenterProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useClientAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any | null>(null)
  const [tickets, setTickets] = useState<ISupportTicket[]>([])

  const submitSupportTicket = async (data: {
    subject: string
    message: string
    orderId?: string
  }) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsLoading(true)
    setError(null)
    try {
      await supportService.createSupportTicket(user.id, data)
      await loadUserTickets() // Recarrega a lista após o envio
    } catch (e) {
      setError(e)
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserTickets = async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    try {
      const userTickets = await supportService.fetchUserTickets(user.id)
      setTickets(userTickets.sort((a, b) => b.updatedAt - a.updatedAt))
    } catch (e) {
      setError(e)
      setTickets([]) // Limpa os tickets em caso de erro
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HelpCenterContext.Provider
      value={{
        isLoading,
        error,
        tickets,
        submitSupportTicket,
        loadUserTickets,
      }}
    >
      {children}
    </HelpCenterContext.Provider>
  )
}

export function useHelpCenter(): HelpCenterContextData {
  const context = useContext(HelpCenterContext)
  if (!context) {
    throw new Error('useHelpCenter deve ser usado dentro de um HelpCenterProvider')
  }
  return context
}
