// ─── Imports

import { Button } from '@mantine/core'
import * as S from './styles'

import { ModalType } from '@/contexts/ConfirmationModalContext'

// ─── Componente Modal

interface IConfirmationModal {
  type?: ModalType
  opened: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationModal({
  type = 'default',
  opened,
  title,
  message,
  onCancel,
  onConfirm,
}: IConfirmationModal) {
  return (
    <S.ConfirmationModal
      opened={opened}
      onClose={onCancel}
      title={<S.ConfirmationModalTitle>{title}</S.ConfirmationModalTitle>}
      centered
    >
      <S.ConfirmationModalContent>{message}</S.ConfirmationModalContent>
      <S.ConfirmationModalFooter>
        <Button
          color={type === 'negative' ? 'gray' : 'red'}
          variant="subtle"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          color={type === 'negative' ? 'red' : 'green'}
          type="submit"
          variant="light"
          onClick={onConfirm}
        >
          Confirmar
        </Button>
      </S.ConfirmationModalFooter>
    </S.ConfirmationModal>
  )
}
