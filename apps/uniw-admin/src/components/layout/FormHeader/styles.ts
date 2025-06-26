import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const FormHeader = styled.header`
  display: flex;

  h3 {
    font-size: ${themeWeb.fonts.size.md};
    line-height: ${themeWeb.fonts.height.tight};
    font-weight: ${themeWeb.fonts.weight.semiBold};

    color: ${colors.text.primary};
  }
`
