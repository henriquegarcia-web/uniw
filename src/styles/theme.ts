// src/styles/theme.ts

export const theme = {
  colors: {
    primary: '#2EBD55', // Verde principal
    secondary: '#C441A4', // Roxo/rosa secundário

    background: '#FFFFFF', // Fundo principal da maioria das telas
    surface: '#F5F5F5', // Fundo de cards, inputs e seções

    text: '#333333', // Cor de texto principal, escura
    text_secondary: '#8A8A8A', // Cor de texto para legendas e placeholders

    border: '#E0E0E0', // Cor para bordas e divisores

    success: '#2EBD55',
    error: '#D91E1E',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  fonts: {
    // OBS: Lembre-se de carregar essas fontes no seu App.tsx usando expo-font!
    family: {
      regular: 'SuaFonteRegular', // Substitua pelo nome da sua fonte
      medium: 'SuaFonteMedium',
      bold: 'SuaFonteBold',
    },
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      '2xl': 32,
    },
    // Pesos de fonte para consistência
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      bold: '700' as const,
    },
  },

  borders: {
    radius: {
      sm: 8,
      md: 16,
    },
    width: {
      thin: 1,
      medium: 2,
    },
  },
}
