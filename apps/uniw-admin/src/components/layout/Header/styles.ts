import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: ${themeWeb.spacing.xl};
  width: 100%;
  height: 100%;
  padding: 0 ${themeWeb.spacing.lg};

  background-color: ${colors.ui.backgroundDark};
`

export const HeaderTitle = styled.div`
  h3 {
    font-size: ${themeWeb.fonts.size.xl};
    line-height: ${themeWeb.fonts.height.tight};
    font-weight: ${themeWeb.fonts.weight.medium};

    color: ${colors.text.onBrand};
  }
`

export const HeaderSearch = styled.div`
  width: 380px;
  margin-right: auto;
`

export const HeaderMenus = styled.div`
  display: flex;
`
