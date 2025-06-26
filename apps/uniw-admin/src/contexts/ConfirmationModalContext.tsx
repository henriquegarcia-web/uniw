'use client'

import { ConfirmationModal } from '@/components/shared'
import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react'

export type ModalType = 'default' | 'negative'

interface ModalOptions {
  type?: ModalType
  title: string
  message: string
  onConfirm: () => void
  onCancel?: () => void
}

interface ConfirmationModalContextType {
  openModal: (options: ModalOptions) => void
}

const ConfirmationModalContext = createContext<ConfirmationModalContextType | undefined>(
  undefined,
)

export const ConfirmationModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null)

  const openModal = useCallback((options: ModalOptions) => {
    setModalOptions(options)
  }, [])

  const closeModal = useCallback(() => {
    if (modalOptions?.onCancel) modalOptions.onCancel()
    setModalOptions(null)
  }, [modalOptions])

  const handleConfirm = useCallback(() => {
    if (modalOptions?.onConfirm) {
      modalOptions.onConfirm()
    }
    closeModal()
  }, [modalOptions, closeModal])

  return (
    <ConfirmationModalContext.Provider value={{ openModal }}>
      {children}
      {modalOptions && (
        <ConfirmationModal
        type={modalOptions?.type}
          opened={!!modalOptions}
          title={modalOptions.title}
          message={modalOptions.message}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      )}
    </ConfirmationModalContext.Provider>
  )
}

export const useConfirmationModal = (): ConfirmationModalContextType => {
  const context = useContext(ConfirmationModalContext)
  if (context === undefined) {
    throw new Error(
      'useConfirmationModal deve ser usado dentro de um ConfirmationModalProvider',
    )
  }
  return context
}
