import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const ViewHeader = styled.header`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: ${themeWeb.fonts.size.xl};
    line-height: ${themeWeb.fonts.height.tight};
    font-weight: ${themeWeb.fonts.weight.medium};

    color: ${colors.text.primary};
  }

  p {
    font-size: ${themeWeb.fonts.size.md};
    line-height: ${themeWeb.fonts.height.tight};
    font-weight: ${themeWeb.fonts.weight.regular};

    color: ${colors.text.secondary};
  }
`
