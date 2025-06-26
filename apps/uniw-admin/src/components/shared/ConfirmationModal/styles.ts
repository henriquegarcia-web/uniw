import styled from 'styled-components'
import { Modal } from '@mantine/core'
import { colors, themeWeb } from '@uniw/shared-constants'

export const ConfirmationModal = styled(Modal)`
  /* display: flex; */
`

export const ConfirmationModalTitle = styled.h2`
  font-size: ${themeWeb.fonts.size.md};
  line-height: ${themeWeb.fonts.height.tight};
  font-weight: ${themeWeb.fonts.weight.semiBold};

  color: ${colors.text.primary};
`

export const ConfirmationModalContent = styled.div`
  font-size: ${themeWeb.fonts.size.md};
  line-height: ${themeWeb.fonts.height.tight};
  font-weight: ${themeWeb.fonts.weight.regular};

  color: ${colors.text.secondary};
`

export const ConfirmationModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: ${themeWeb.spacing.sm};
  margin-top: ${themeWeb.spacing.md};
`
