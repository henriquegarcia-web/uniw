'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { initializeFirebase } from '@uniw/shared-services'
import { firebaseConfig } from '@/services/firebaseConfig'

interface FirebaseContextType {
  isInitialized: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  isInitialized: false,
})

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isInitialized) return

    try {
      // A inicialização agora acontece aqui, dentro de um client component
      initializeFirebase(firebaseConfig)
      setIsInitialized(true)
      console.log('Firebase initialized from Provider.')
    } catch (error) {
      console.error('Firebase initialization failed in Provider:', error)
    }
  }, [isInitialized])

  return (
    <FirebaseContext.Provider value={{ isInitialized }}>
      {children}
    </FirebaseContext.Provider>
  )
}
