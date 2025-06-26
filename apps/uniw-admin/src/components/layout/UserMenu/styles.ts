import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${themeWeb.spacing.sm};
  cursor: pointer;

  p {
    font-size: ${themeWeb.fonts.size.sm};
    line-height: ${themeWeb.fonts.height.tight};
    font-weight: ${themeWeb.fonts.weight.regular};

    color: ${colors.text.onBrand};
  }
`

export const UserMenuDropwdownExitWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
