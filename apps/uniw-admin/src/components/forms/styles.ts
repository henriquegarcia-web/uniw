import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;

  button[type='submit'] {
    margin-top: 10px;
  }
`

export const FormError = styled.p`
  margin-top: ${themeWeb.spacing.sm};

  font-size: ${themeWeb.fonts.size.sm};
  line-height: ${themeWeb.fonts.height.tight};

  font-weight: ${themeWeb.fonts.weight.medium};

  color: ${colors.semantic.error};
`
