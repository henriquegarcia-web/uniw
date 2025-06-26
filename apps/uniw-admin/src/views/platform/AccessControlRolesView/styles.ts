import { Table, TextInput } from '@mantine/core'
import styled from 'styled-components'

import { colors, themeWeb } from '@uniw/shared-constants'
import { DashboardLayoutView } from '@/components/layouts/DashboardLayout/styles'

export const AccessControlRolesView = styled(DashboardLayoutView)``

export const FormWrapper = styled.form`
  display: flex;
  align-items: flex-end;
  gap: ${themeWeb.spacing.md};
  width: 100%;
`

export const FormButtonWrapper = styled.div`
  display: flex;
`

export const StyledTextInput = styled(TextInput)`
  flex: 1;
`

export const ActionsCell = styled(Table.Td)`
  display: flex;
  column-gap: ${themeWeb.spacing.xs};
  width: 200px;
`

export const DrawerFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
`

export const ReadOnlyData = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e9ecef;

  p {
    margin: 0;
    color: #495057;
    font-size: 0.9rem;

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    strong {
      color: #343a40;
    }
  }
`

export const PermissionsGrid = styled.div`
  border-top: 1px solid ${colors.ui.border};
  border-bottom: 1px solid ${colors.ui.border};
  padding-block: ${themeWeb.spacing.md};

  h4 {
    margin-bottom: ${themeWeb.spacing.md};
    font-size: ${themeWeb.fonts.size.md};
    line-height: ${themeWeb.fonts.height.tight};
    font-weight: ${themeWeb.fonts.weight.semiBold};
    color: ${colors.text.primary};
  }

  display: flex;
  flex-direction: column;
  row-gap: ${themeWeb.spacing.xs};
`

export const DrawerActions = styled.div`
  margin-top: auto;
  padding-top: ${themeWeb.spacing.md};
  display: flex;
  gap: ${themeWeb.spacing.xs};
  justify-content: flex-start;
`
