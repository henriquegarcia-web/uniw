import { Table, TextInput } from '@mantine/core'
import styled from 'styled-components'

import { colors, themeWeb } from '@uniw/shared-constants'
import { DashboardLayoutView } from '@/components/layouts/DashboardLayout/styles'

export const AccessControlRolesView = styled(DashboardLayoutView)``

export const FormWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: ${themeWeb.spacing.md};
  width: 100%;
`

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const AdminListTable = styled(Table)`
  border-radius: ${themeWeb.borders.radius.xs};
`

export const AdminListTableTr = styled(Table.Tr)<{ disabled: number }>`
  background-color: ${({ disabled }) =>
    disabled ? colors.ui.surface : colors.ui.background};
`

export const ActionsCell = styled(Table.Td)`
  display: flex;
  column-gap: ${themeWeb.spacing.xs};
`

export const EditAdminForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.md};
  height: 100%;
`

export const EditAdminFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.sm};
  padding-bottom: ${themeWeb.spacing.md};

  border-bottom: 1px solid ${colors.ui.border};
`

export const ReadOnlyData = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.xs};
  padding: ${themeWeb.spacing.md};
  border-radius: ${themeWeb.borders.radius.xs};

  background-color: #f8f9fa;
  border: 1px solid #e9ecef;

  p {
    font-size: ${themeWeb.fonts.size.sm};
    line-height: ${themeWeb.fonts.height.tight};

    color: ${colors.text.primary};
  }
`

export const DrawerActions = styled.div`
  display: flex;
  column-gap: ${themeWeb.spacing.xs};
  justify-content: flex-start;

  button {
    padding-inline: ${themeWeb.spacing.sm};
  }
`
