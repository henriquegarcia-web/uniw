// ─── Imports ────────────────────────────────────────────────────────────────

import '@/libs/firebase'
import '@mantine/core/styles.css'
import { MantineProvider, mantineHtmlProps } from '@mantine/core'
import { colors, themeWeb } from '@uniw/shared-constants'
import '../styles/main.scss'

import ColorSchemeScript from '@/components/ColorSchemeScript'
import { roboto, lora } from '@/libs/fonts'
import { mainMetadata } from '@/configs/metadata'
import { FirebaseProvider } from '@/contexts/FirebaseContext'
import { AuthProvider } from '@/contexts/AuthContext'

// ─── Metadados da Aplicação ─────────────────────────────────────────────────

export const metadata = mainMetadata

// import { initializeFirebase } from '@uniw/shared-services'
// import { firebaseConfig } from '@/libs/firebase'

// Chame a função de inicialização AQUI, no escopo do módulo.
// Isso garante que ela execute uma única vez, antes de qualquer renderização.
// initializeFirebase(firebaseConfig)

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
          <MantineProvider>
            <AuthProvider>{children}</AuthProvider>
          </MantineProvider>
        </FirebaseProvider>
      </body>
    </html>
  )
}

// defaultColorScheme="light"
