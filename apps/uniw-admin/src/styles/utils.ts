import styled from 'styled-components'
import { themeWeb } from '@uniw/shared-constants'

export const Screen = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: fit-content;
  min-height: 100svh;

  @supports not (min-height: 100svh) {
    min-height: 100vh;
  }

  @media (min-width: ${themeWeb.breakpoints.md}) {
    min-height: 100dvh;
  }
`

export const ScreenFixed = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100svh;

  @supports not (height: 100svh) {
    height: 100vh;
  }

  @media (min-width: ${themeWeb.breakpoints.md}) {
    height: 100dvh;
  }
`
