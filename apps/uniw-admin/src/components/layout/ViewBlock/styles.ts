import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const ViewBlock = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.lg};
  padding: ${themeWeb.spacing.xl};
  border-radius: ${themeWeb.borders.radius.sm};

  box-shadow:
    0 1px 5px 0 rgb(0 0 0 / 0.1),
    0 1px 5px -1px rgb(0 0 0 / 0.1);
  background-color: ${colors.ui.background};
`

export const ViewBlockHeader = styled.h2`
  font-size: ${themeWeb.fonts.size.lg};
  line-height: ${themeWeb.fonts.height.tight};
  font-weight: ${themeWeb.fonts.weight.semiBold};

  color: ${colors.text.primary};
`

export const ViewBlockContent = styled.div`
  display: flex;
`
