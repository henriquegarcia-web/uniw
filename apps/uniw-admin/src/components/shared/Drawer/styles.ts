import styled from 'styled-components'
import { Drawer as MantineDrawer } from '@mantine/core'
import { colors, themeWeb } from '@uniw/shared-constants'

export const Drawer = styled(MantineDrawer)`
  /* display: flex; */

  header {
    display: flex;
    flex: 1;
    padding: 0px !important;
    height: 70px;

    h2 {
      display: flex;
      flex: 1;
      height: 70px;
    }
  }

  .mantine-Drawer-content {
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
  }

  .mantine-Drawer-body {
    padding: ${themeWeb.spacing.xl};
  }
`

export const DrawerHeader = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-inline: ${themeWeb.spacing.xl};

  background-color: ${colors.ui.backgroundDark};
  border-bottom: 1px solid ${colors.ui.borderDark};
`

export const DrawerHeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  flex: 1;

  font-size: ${themeWeb.fonts.size.md};
  line-height: ${themeWeb.fonts.height.tight};
  font-weight: ${themeWeb.fonts.weight.medium};

  color: ${colors.text.onBrand};
`
