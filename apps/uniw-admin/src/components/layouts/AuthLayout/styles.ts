import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const AuthLayoutScreen = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100svh;
`

export const AuthLayoutScreenBackground = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const AuthLayoutContainer = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;
  padding: ${themeWeb.spacing.xl};
  row-gap: ${themeWeb.spacing.xl};
  border-radius: 8px;

  background-color: ${colors.ui.background};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const AuthLayoutContainerHeader = styled.div`
  display: flex;
`

export const AuthLayoutContainerContent = styled.div`
  display: flex;
`
