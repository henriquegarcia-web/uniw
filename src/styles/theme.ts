// src/styles/theme.ts

export const theme = {
  colors: {
    primary: '#00CF00',
    secondary: '#B667A5',

    background: '#FFFFFF',
    surface: '#F5F5F5',

    text: '#333333',
    text_secondary: '#676767',

    border: '#E0E0E0',

    success: '#2EBD55',
    error: '#F83758',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 42,
    '3xl': 54,
    '4xl': 64,
    'phone-default-header': 30,
  },

  fonts: {
    family: {
      thin: 'Montserrat-Thin',
      extraLight: 'Montserrat-ExtraLight',
      light: 'Montserrat-Light',
      regular: 'Montserrat-Regular',
      medium: 'Montserrat-Medium',
      semiBold: 'Montserrat-SemiBold',
      bold: 'Montserrat-Bold',
      extraBold: 'Montserrat-ExtraBold',
      black: 'Montserrat-Black',
    },
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      '2xl': 34,
      '3xl': 42,
    },
    weights: {
      thin: '100' as const,
      extraLight: '200' as const,
      light: '300' as const,
      regular: '400' as const,
      medium: '500' as const,
      semiBold: '600' as const,
      bold: '700' as const,
      extraBold: '800' as const,
      black: '900' as const,
    },
  },

  borders: {
    radius: {
      xs: 4,
      sm: 8,
      md: 16,
      circle: 100,
    },
    width: {
      thin: 1,
      medium: 2,
    },
  },
}
