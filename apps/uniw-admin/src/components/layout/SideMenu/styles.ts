import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
`

export const SideMenuHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${themeWeb.spacing.custom['dashboard-header']};

  border-bottom: 1px solid ${colors.ui.borderDark};
  border-right: 1px solid ${colors.ui.borderDark};
  background-color: ${colors.ui.backgroundDark};
`

export const SideMenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.lg};
  height: calc(100vh - ${themeWeb.spacing.custom['dashboard-header']});
  padding: ${themeWeb.spacing.md};
  padding-bottom: ${themeWeb.spacing.xl};
  overflow-y: auto;
  border-right: 1px solid ${colors.ui.disabled};

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 10px;
    z-index: 1000;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.ui.scrollbarTrack};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${colors.ui.scrollbarThumb};
  }
`

export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.sm};
`

export const MenuGroupTitle = styled.h3`
  font-size: ${themeWeb.fonts.size.sm};
  line-height: ${themeWeb.fonts.height.tight};
  font-weight: ${themeWeb.fonts.weight.semiBold};

  color: ${colors.text.secondary};
`

export const MenuGroupList = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.xs};
`
