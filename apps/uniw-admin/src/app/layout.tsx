// ─── Imports ────────────────────────────────────────────────────────────────

import '@mantine/core/styles.css'
import { MantineProvider, mantineHtmlProps } from '@mantine/core'
import { colors, themeWeb } from '@uniw/shared-constants'
import '../styles/main.scss'

import ColorSchemeScript from '@/components/ColorSchemeScript'
import { roboto, lora } from '@/libs/fonts'
import { mainMetadata } from '@/configs/metadata'

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
        className={`${roboto.variable} ${lora.variable} ${allVariables as React.CSSProperties} antialiased`}
      >
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}

// defaultColorScheme="light"
