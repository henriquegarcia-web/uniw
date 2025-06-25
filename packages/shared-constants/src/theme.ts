export const colors = {
  brand: {
    primary: '#00CF00',
    primaryHover: '#00A800',
    secondary: '#B667A5',
    secondaryHover: '#9E568F',
  },
  ui: {
    background: '#FFFFFF',
    backgroundDark: '#1f2937',
    surface: '#FAFAFA',
    border: '#E0E0E0',
    borderDark: '#374151',
    disabled: '#D4D4D4',
    placeholder: '#F0F0F0',
    scrollbarTrack: '#D4D4D4',
    scrollbarThumb: '#8f8f8f',
  },
  text: {
    primary: '#333333',
    secondary: '#676767',
    tertiary: '#A1A1A1',
    disabled: '#A1A1A1',
    onBrand: '#FFFFFF',
  },
  semantic: {
    success: '#2EBD55',
    error: '#F83758',
    warning: '#EDB310',
    info: '#2196F3',
  },
  ecommerce: {
    sale: '#EB4034',
    rating: '#EDB310',
    newArrival: '#B667A5',
  },
}

export const themeApp = {
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 30,
    xxl: 40,

    custom: {
      'phone-default-header': 30,
      'botom-tab-height': 60,
    },
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
      lg: 18,
      xl: 24,
      xxl: 34,
      xxxl: 42,
    },
  },
  borders: {
    radius: {
      xs: 4,
      sm: 8,
      md: 16,
      full: 100,
    },
    width: {
      thin: 1,
      medium: 2,
      large: 3,
    },
  },
}

export const themeWeb = {
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '30px',
    xxl: '40px',
    wrapper: '1400px',

    custom: {
      'dashboard-header': '70px',
      'dashboard-sidemenu-opened': '270px',
      'dashboard-sidemenu-closed': '60px',
    },
  },
  fonts: {
    family: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      serif: "'Merriweather', serif",
      mono: "'Fira Code', 'Courier New', monospace",
    },
    size: {
      xs: '0.75rem', // 12px - Para legendas, 'disclaimers'
      sm: '0.875rem', // 14px - Corpo de texto secundário, inputs
      md: '1rem', // 16px - Base/corpo de texto principal
      lg: '1.125rem', // 18px - Subtítulos
      xl: '1.375rem', // 22px - Títulos de seção (h3)
      '2xl': '2rem', // 32px - Títulos de página (h2)
      '3xl': '2.5rem', // 40px - Títulos de grande destaque (h1)
    },
    weight: {
      thin: '100',
      extraLight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
      extraBold: '800',
      black: '900',
    },
    height: {
      tight: 1.25, // Para títulos
      normal: 1.5, // Para corpo de texto, garantindo boa legibilidade
      loose: 1.75, // Para parágrafos longos ou seções de texto denso
    },
  },
  borders: {
    radius: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      full: '50%',
    },
    width: {
      thin: '1px',
      medium: '2px',
      large: '3px',
    },
  },
  shadows: {
    sm: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  zIndices: {
    base: 1,
    dropdown: 1000,
    sticky: 1100,
    backdrop: 1200,
    modal: 1300,
    popover: 1400,
    toast: 1500,
  },
}
