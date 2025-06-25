'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { IUser } from '@uniw/shared-types'
import { adminAccessManagerService } from '@uniw/shared-services'
import { useFirebase } from './FirebaseContext'

interface AccessManagerContextType {
  admins: IUser[]
  loading: boolean
  addUser: (userData: { nome: string; email: string; cpf: string }) => Promise<void>
  updateUserFields: (
    userId: string,
    updates: Partial<{ [K in keyof IUser | string]: any }>,
  ) => Promise<void>
  deleteAdmin: (userId: string) => Promise<void>
}

const AccessManagerContext = createContext<AccessManagerContextType | undefined>(
  undefined,
)

export const AccessManagerProvider = ({ children }: { children: ReactNode }) => {
  const { isInitialized } = useFirebase()

  const [admins, setAdmins] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isInitialized) {
      setLoading(false)
      return
    }

    setLoading(true)
    const unsubscribe = adminAccessManagerService.listenToAdminUsers((fetchedAdmins) => {
      setAdmins(fetchedAdmins)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [isInitialized])

  const handleAddUser = async (userData: {
    nome: string
    email: string
    cpf: string
  }) => {
    await adminAccessManagerService.addAdminUser(userData)
  }

  const handleUpdateUserFields = async (
    userId: string,
    updates: Partial<{ [K in keyof IUser | string]: any }>,
  ) => {
    await adminAccessManagerService.updateUserFields(userId, updates)
  }

  const handleDeleteAdmin = async (userId: string) => {
    await adminAccessManagerService.deleteUser(userId)
  }

  const contextValue: AccessManagerContextType = {
    admins,
    loading,
    addUser: handleAddUser,
    updateUserFields: handleUpdateUserFields,
    deleteAdmin: handleDeleteAdmin,
  }

  return (
    <AccessManagerContext.Provider value={contextValue}>
      {children}
    </AccessManagerContext.Provider>
  )
}

export const useAccessManager = (): AccessManagerContextType => {
  const context = useContext(AccessManagerContext)
  if (context === undefined) {
    throw new Error('useAccessManager deve ser usado dentro de um AccessManagerProvider')
  }
  return context
}
