'use client'

import React from 'react'

import { FirebaseProvider } from '@/contexts/FirebaseContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { AccessManagerProvider } from '@/contexts/AccessManagerContext'
import { AdminMenuProvider } from '@/contexts/AdminMenuContext'
import StyledComponentsRegistry from '@/contexts/StyledComponentsContext'
import { createTheme, DEFAULT_THEME, MantineProvider } from '@mantine/core'
import GlobalStyle from '@/styles/globals'

const theme = createTheme({
  // 1. Defina um nome para sua cor customizada (ex: 'uniw-green')
  colors: {
    ...DEFAULT_THEME.colors, // Importante: inclua as cores padrão do Mantine
    'uniw-green': [
      '#e6fcee',
      '#cff8dd',
      '#a2efb9',
      '#72e693',
      '#4cdd73',
      '#35d861',
      // 6. Sua cor principal, geralmente no índice 5 ou 6
      '#26b34e', // <--- O valor '#00CF00' pode ser ajustado para a escala
      '#1b9c44',
      '#0f8539',
      '#006e2c',
    ],
  },
  // 2. Agora, referencie o NOME da cor que você criou
  primaryColor: 'uniw-green',
})

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      <StyledComponentsRegistry>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <AdminMenuProvider>
              <AccessManagerProvider>
                <GlobalStyle />
                {children}
              </AccessManagerProvider>
            </AdminMenuProvider>
          </AuthProvider>
        </MantineProvider>
      </StyledComponentsRegistry>
    </FirebaseProvider>
  )
}

export default AppProviders
