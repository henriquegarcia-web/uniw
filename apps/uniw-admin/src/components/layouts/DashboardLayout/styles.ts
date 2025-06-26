import styled from 'styled-components'
import { colors, themeWeb } from '@uniw/shared-constants'

export const DashboardLayoutScreen = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100svh;
`

export const DashboardLayoutMenu = styled.div`
  width: ${themeWeb.spacing.custom['dashboard-sidemenu-opened']};
  height: 100%;
`

export const DashboardLayoutContent = styled.div`
  width: calc(100% - ${themeWeb.spacing.custom['dashboard-sidemenu-opened']});
  height: 100%;
`

export const DashboardLayoutHeader = styled.div`
  width: 100%;
  height: ${themeWeb.spacing.custom['dashboard-header']};

  border-bottom: 1px solid ${colors.ui.borderDark};
`

export const DashboardLayoutViewsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - ${themeWeb.spacing.custom['dashboard-header']});
  padding: ${themeWeb.spacing.lg};

  background: ${colors.ui.surface};
`

export const DashboardLayoutViewsWrapper = styled.div`
  width: ${themeWeb.spacing.wrapper};
`

export const DashboardLayoutPage = styled.div`
  padding: ${themeWeb.spacing.xl};
  border-radius: ${themeWeb.borders.radius.sm};

  border: 1px solid ${colors.ui.border};
  background-color: ${colors.ui.background};
`

export const DashboardLayoutView = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.xl};
`
