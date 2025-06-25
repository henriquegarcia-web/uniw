// ─── Imports ────────────────────────────────────────────────────────────────

import '@/libs/firebase'
import '@mantine/core/styles.css'
import {
  DEFAULT_THEME,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from '@mantine/core'
import { colors, themeWeb } from '@uniw/shared-constants'
import '../styles/main.scss'

import ColorSchemeScript from '@/components/ColorSchemeScript'
import { roboto, lora } from '@/libs/fonts'
import { mainMetadata } from '@/configs/metadata'
import { FirebaseProvider } from '@/contexts/FirebaseContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { AccessManagerProvider } from '@/contexts/AccessManagerContext'
import { AdminMenuProvider } from '@/contexts/AdminMenuContext'

// ─── Metadados da Aplicação ─────────────────────────────────────────────────

export const metadata = mainMetadata

// ─── Função de Conversão JS para CSS ────────────────────────────────────────

function toCssVariables(themeObject: object, prefix = ''): Record<string, string> {
  const variables: Record<string, string> = {}
  for (const [key, value] of Object.entries(themeObject)) {
    const newKey = prefix ? `${prefix}-${key}` : key
    if (typeof value === 'object' && value !== null) {
      Object.assign(variables, toCssVariables(value, newKey))
    } else {
      variables[`--${newKey}`] = String(value)
    }
  }
  return variables
}

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

// ─── Componente RootLayout ──────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const colorVariables = toCssVariables(colors)
  const themeWebVariables = toCssVariables(themeWeb)

  const allVariables = { ...colorVariables, ...themeWebVariables }

  return (
    <html lang="pt-br" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        /> */}
      </head>
      <body
        className={`${roboto.variable} ${lora.variable} antialiased`}
        style={allVariables}
      >
        <FirebaseProvider>
          <MantineProvider theme={theme}>
            <AuthProvider>
              <AdminMenuProvider>
                <AccessManagerProvider>{children}</AccessManagerProvider>
              </AdminMenuProvider>
            </AuthProvider>
          </MantineProvider>
        </FirebaseProvider>
      </body>
    </html>
  )
}

// defaultColorScheme="light"
