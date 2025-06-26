// ─── Imports ────────────────────────────────────────────────────────────────

import '@/libs/firebase'
import '@mantine/core/styles.css'

import { mantineHtmlProps } from '@mantine/core'

import ColorSchemeScript from '@/components/ColorSchemeScript'
import { roboto, lora } from '@/libs/fonts'
import { mainMetadata } from '@/configs/metadata'
import AppProviders from '@/contexts/AppProviders'

// ─── Metadados da Aplicação ─────────────────────────────────────────────────

export const metadata = mainMetadata

// ─── Componente RootLayout ──────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        /> */}
      </head>
      <body className={`${roboto.variable} ${lora.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}

// defaultColorScheme="light"
