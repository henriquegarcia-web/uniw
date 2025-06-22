// ─── Imports ────────────────────────────────────────────────────────────────

import '@mantine/core/styles.css'
import { MantineProvider, mantineHtmlProps } from '@mantine/core'
import '../styles/main.scss'

import ColorSchemeScript from '@/components/ColorSchemeScript'
import { roboto, lora } from '@/libs/fonts'
import { mainMetadata } from '@/configs/metadata'

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
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}

// defaultColorScheme="light"
